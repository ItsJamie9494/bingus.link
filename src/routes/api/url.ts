// Copyright (C) 2021 Jamie Thalacker

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import express from 'express'
import validUrl from 'valid-url'
import shortid from 'shortid'

import Url from '../../models/UrlModel'
import { encrypt, hash } from '../../lib/crypto'
import apiRateLimit from '../../lib/ratelimit'
import { verifyProtocol } from '../../lib/url'
import { EmbedInterface } from '../../interfaces/EmbedInterface'
import { env } from '../../env'

const router = express.Router()

// @route         POST /api/url/shorten
// @description   Create Short URL
router.post(
    '/shorten',
    apiRateLimit,
    async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Permissions-Policy', 'interest-cohort=()')

        const {
            longURL,
            urlCode = shortid.generate(),
            embedTitle = `This is a URL shortened with ${env.instance.base_url}`,
            embedDescription = `Create your own at ${env.instance.base_url}`,
            embedImage = `${env.instance.base_url}/images/bingus.png`,
        } = req.body

        if (!validUrl.isUri(env.instance.base_url || 'http://localhost:5000')) {
            return res.status(500).json({
                error: 'invalidBaseURL',
                message: 'Server Error: Invalid Base URL',
            })
        }

        let verifiedURL = verifyProtocol(longURL)

        if (validUrl.isUri(verifiedURL)) {
            try {
                if (
                    await Url.findOne({
                        urlCode: urlCode,
                    })
                ) {
                    return res.status(400).json({
                        error: 'invalidURLCode',
                        message: 'Invalid URL Code',
                    })
                }

                const embedInfo: EmbedInterface = {
                    title: encrypt(embedTitle),
                    description: encrypt(embedDescription),
                    image: encrypt(embedImage),
                }

                let url = new Url({
                    schemaVersion: 1, // This tells us the URL uses the Newer Format
                    urlCode: hash(encodeURIComponent(urlCode)), // We hash the URL code
                    longURL: JSON.stringify(encrypt(verifiedURL)),
                    hitCount: 0,
                    embedInfo: JSON.stringify(embedInfo),
                    date: new Date(),
                })
                await url.save()
                return res.json({
                    success: 'URL Created',
                    url: `${env.instance.base_url}/${urlCode}`,
                    urlCode: urlCode,
                })
            } catch (err: unknown) {
                console.error(`❌ ${err}`)
                return res
                    .status(500)
                    .json({ error: 'serverError', message: 'Server Error' })
            }
        } else {
            return res
                .status(400)
                .json({ error: 'invalidLongURL', message: 'Invalid Long URL' })
        }
    }
)
router.get(
    '/shorten',
    async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Permissions-Policy', 'interest-cohort=()')
        return res.status(400).json({
            error: 'invalidMethod',
            message: 'GET is not supported at /api/url/shorten',
        })
    }
)

export default router
