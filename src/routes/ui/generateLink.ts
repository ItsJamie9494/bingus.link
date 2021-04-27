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
import axios, { AxiosError, AxiosResponse } from 'axios'

const router = express.Router()

// @route         GET /generateLink
// @description   Generate link and respond with web page
router.get('/generateLink', async (req: express.Request, res: express.Response ) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.setHeader('Permissions-Policy', 'interest-cohort=()')

    // Verify that query is valid
    if (req.query.longURL === undefined) {
        return res.render('generateLink/error')
    }

    let baseURL = process.env.baseURL || 'http://localhost:5000'

    let formBody = [];
    formBody.push('longURL=' + req.query.longURL)
    if (req.query.urlCode) {
        formBody.push('urlCode=' + req.query.urlCode)
    }
    let parsedFormBody = formBody.join("&");

    axios.post(`${baseURL}/api/url/shorten`, parsedFormBody, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then((axiosRes: AxiosResponse) => {
        if (axiosRes.status === 200) {
            console.error('✅ User Successfuly Created Link')
            res.render('generateLink/success', { url: axiosRes.data.url, urlCode: axiosRes.data.urlCode })
        } else if (axiosRes.status == 400 && axiosRes.data.error == 'invalidURLCode') {
            console.error('❌ User Invalid URL Code')
            res.render('generateLink/invalidUrlCode')
        } else if (axiosRes.status == 429 && axiosRes.data.error == 'rateLimited') {
            console.error('❌ User Rate Limited')
            res.render('generateLink/rateLimit')
        } else {
            console.error(`❌ Unknown Error, ${axiosRes}`)
            res.render('generateLink/error')
        }
    }).catch((err: AxiosError) => {
        console.error(`❌ Axios Request Error: ${err}`)
        res.render('generateLink/error')
    })
})

export default router