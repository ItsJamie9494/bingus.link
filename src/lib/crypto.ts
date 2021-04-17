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

import crypto from 'crypto'
import { HashInterface } from '../interfaces/HashInterface'

const algorithm = 'base64'
const iv = crypto.randomBytes(16)

export const encrypt = (contents: string) => {
    const cipher = crypto.createCipheriv(algorithm, process.env.cryptoSecretKey || '', iv)

    const encrypted = Buffer.concat([cipher.update(contents), cipher.final()])

    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    }
}

export const decrypt = (hash: HashInterface) => {
    const decipher = crypto.createDecipheriv(algorithm, process.env.cryptoSecretKey || '', iv)

    const decryped = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()])

    return decryped.toString()
}