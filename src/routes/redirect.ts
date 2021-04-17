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

import Url from '../models/UrlModel'

const router = express.Router()

// @route         GET /:code
// @description   Redirect to the original URL
router.get('/:code', async (req: express.Request, res: express.Response ) => {
    try {
        const url = await Url.findOne({
            urlCode: req.params.code
        })
        if (url) {
            return res.redirect(url.longURL)
        } else {
            return res.status(404).json({ error: 'noURL', message: `No URL found for code ${req.params.code}` })
        }
    }
    catch (err: unknown) {
        res.status(500).json({ error: 'Server Error', message: `${err}` })
    }
})

module.exports = router