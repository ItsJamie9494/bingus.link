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
import { env } from '../env'
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
            let embedTitle = `This is a URL shortened with ${env.instance.name}`
            let embedDescription = `Create your own at ${env.instance.base_url}`
            let embedImage = `${env.instance.base_url}/images/bingus.png`

            if (url.embedInfo) {
                let embedInfo = JSON.parse(url.embedInfo)
                embedTitle = decrypt(embedInfo.title)
                embedDescription = decrypt(embedInfo.description)
                embedImage = decrypt(embedInfo.image)
            }

            return res.render('shortURL', {
                url: `${env.instance.base_url}/source/${encodedURLCode}`,
                baseUrl: env.instance.base_url,
                title: `This is a URL shortened with ${env.instance.name}`,

                // Custom Embed
                embedTitle: embedTitle,
                embedDescription: embedDescription,
                embedImage: embedImage,
            })
        } else {
            return res.status(404).render('404', {
                title: '404',
                message: `No shortened URL was found for "${encodedURLCode}"`,
                baseUrl: env.instance.base_url,
                btnMessage: 'Create It!',
            })
        }
    } catch (err: unknown) {
        console.error(`❌ Server Error: ${err}`)
        return res.status(500).render('error', {
            title: 'Server Error',
            message: err,
            baseUrl: env.instance.base_url,
        })
    }
})

export default router
