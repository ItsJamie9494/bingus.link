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

import * as dotenv from 'dotenv'
dotenv.config()

export const env = {
    database: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        collection: process.env.DB,
    },
    crypto: {
        secret_key: process.env.cryptoSecretKey,
    },
    hCaptcha: {
        secret_key: process.env.hCaptchaSecretKey,
        site_key: process.env.hCaptchaSiteKey,
    },
    instance: {
        base_url: process.env.baseURL,
        name: process.env.instanceName,
    },
}
