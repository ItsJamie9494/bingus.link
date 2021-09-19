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
import { decrypt, hash } from '../lib/crypto'

import Url from '../models/UrlModel'

const router = express.Router()

// @route         GET /:code
// @description   Redirect to the original URL
router.get('/:code', async (req: express.Request, res: express.Response) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.setHeader('Permissions-Policy', 'interest-cohort=()')

    try {
        let encodedURLCode = encodeURIComponent(req.params.code)
        let hashedURLCode = hash(encodedURLCode)
        const url = await Url.findOne({
            urlCode: hashedURLCode,
        })

        if (url) {
            url.hitCount = (url.hitCount || 0) + 1
            url.save()

            // Decrypt Embed Info
            let embedTitle = `This is a URL shortened with ${process.env.instanceName}`
            let embedDescription = `Create your own at ${process.env.baseURL}`
            let embedImage = `${process.env.baseURL}/images/bingus.png`

            if (url.embedInfo) {
                let embedInfo = JSON.parse(url.embedInfo)
                embedTitle = decrypt(embedInfo.title)
                embedDescription = decrypt(embedInfo.description)
                embedImage = decrypt(embedInfo.image)
            }

            return res.render('shortURL', {
                url: `${process.env.baseURL}/source/${encodedURLCode}`,
                baseUrl: process.env.baseURL,
                title: `This is a URL shortened with ${process.env.instanceName}`,

                // Custom Embed
                embedTitle: embedTitle,
                embedDescription: embedDescription,
                embedImage: embedImage,
            })
        } else {
            return res.status(404).render('404', {
                title: '404',
                message: `No shortened URL was found for "${encodedURLCode}"`,
                baseUrl: process.env.baseURL,
                btnMessage: 'Create It!',
            })
        }
    } catch (err: unknown) {
        console.error(`❌ Server Error: ${err}`)
        return res.status(500).render('error', {
            title: 'Server Error',
            message: err,
            baseUrl: process.env.baseURL,
        })
    }
})

export default router
