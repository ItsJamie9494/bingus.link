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

// @route         POST /verify
// @description   Verify hCaptcha response
router.post('/', async (req: express.Request, res: express.Response ) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.setHeader('Permissions-Policy', 'interest-cohort=()')

    try {
        let formBody = [];
        formBody.push('response=' + req.body.hCaptchaResponse)
        formBody.push('secret=' + process.env.hCaptchaSecretKey)
        formBody.push('sitekey=' + process.env.hCaptchaSiteKey)
        let parsedFormBody = formBody.join("&");

        axios.post('https://hcaptcha.com/siteverify', parsedFormBody, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((axiosRes: AxiosResponse) => {
            let data = axiosRes.data
            if (data.success === true) {
                console.log('✅ hCaptcha Verified')
                return res.json({ success: 'hCaptchaVerified', message: 'hCaptcha Successfully Verified', timestamp: data.timestamp })
            } else {
                console.error(`❌ hCaptcha Failed`)
                return res.json({ error: 'hCaptchaFailed', message: 'hCaptcha Verification Failed', timestamp: data.timestamp })
            }
        }).catch((err: AxiosError) => {
            console.error(`❌ hCaptcha Error: ${err}`)
            return res.status(500).json({ error: 'axiosError', message: 'Unknown Axios Error' })
        })
    }
    catch (err: unknown) {
        console.error(`❌ Server Error: ${err}`)
        return res.status(500).render('error', { title: 'Server Error', message: err })
    }
})

export default router