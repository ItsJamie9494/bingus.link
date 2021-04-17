// Copyright (C) 2021 Trevor Thalacker

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

import Url from '../models/UrlModel'

const router = express.Router()

// @route         POST /api/url/shorten
// @description   Create Short URL

router.post('/shorten', async (req: express.Request, res: express.Response) => {
    const { longURL } = req.body

    if (!validUrl.isUri(process.env.baseURL || 'http://localhost:9000')) {
        return res.status(401).json({ error: 'invalidBaseURL', message: 'Server Error: Invalid Base URL' })
    }

    const urlCode = shortid.generate()

    if (validUrl.isUri(longURL)) {
        try {
            let url = await Url.findOne({
                longURL
            })

            if (url) {
                res.json({ error: 'URL Already In Existence', url: url })
            } else {
                const shortURL = process.env.baseURL + '/' + urlCode

                url = new Url({
                    longURL,
                    shortURL,
                    urlCode,
                    date: new Date()
                })
                await url.save()
                res.json({ success: 'URL Created', url: url })
            }
        } catch (err: unknown) {
            res.status(500).json({ error: 'Server Error', message: `${err}` })
        }
    } else {
        res.status(401).json({ error: 'invalidLongURL',  message: 'Invalid Long URL' })
    }
})

export default router