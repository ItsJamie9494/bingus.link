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

import Url from '../models/UrlModel'
import { EmbedInterface } from '../interfaces/EmbedInterface'
import {
    NewURLDataFormatInterface,
    OldURLDataFormatInterface,
} from '../interfaces/URLDataInterface'
import { decrypt, hash } from './crypto'

export const verifyProtocol = (url: string) => {
    // Verify that the URL has some form of a protocol, preferrably HTTP/HTTPS
    if (url.search(/^http[s]?:\/\//) == -1) {
        url = 'http://' + url
    }
    return url
}

export const findURL = async (urlCode: string) => {
    let hashedURlCode = hash(urlCode)
    const url = await Url.findOne({
        urlCode: hashedURlCode,
    })

    if (url) {
        return url
    } else {
        const url = await Url.findOne({
            urlCode: urlCode,
        })

        if (url) {
            return url
        } else {
            return undefined
        }
    }
}

// idk why this exists but maybe it'll be useful one day
// export const decryptURL = (url: any) => {
//     // First, check the Schema Version
//     if (url.schemaVersion != 1) {
//         // This is an older URL and must be handled as such
//         let decryptedEmbedInfo: EmbedInterface = {
//             title: decrypt(url.embedInfo.title),
//             description: decrypt(url.embedInfo.description),
//             image: decrypt(url.embedInfo.image),
//         }
//         let decryptedURL: OldURLDataFormatInterface = {
//             urlCode: url.urlCode,
//             longURL: decrypt(url.longURL),
//             shortURL: url.shortURL,
//             hitCount: url.hitCount,
//             // i am a fucking idiot for doing it this way in the past
//             embedInfo: url.embedInfo ? decryptedEmbedInfo : undefined,
//             date: url.date,
//         }
//         return decryptedURL
//     } else {
//         // This is a newer URL and must be handled as such
//         let decryptedEmbedInfo: EmbedInterface = {
//             title: decrypt(url.embedInfo.title),
//             description: decrypt(url.embedInfo.description),
//             image: decrypt(url.embedInfo.image),
//         }
//         let decryptedURL: NewURLDataFormatInterface = {
//             schemaVersion: 1,
//             urlCode: url.urlCode,
//             longURL: decrypt(url.longURL),
//             hitCount: url.hitCount,
//             // i am a fucking idiot for doing it this way in the past
//             embedInfo: url.embedInfo ? decryptedEmbedInfo : undefined,
//             adminPassword: url.adminPassword,
//             date: url.date,
//         }
//         return decryptedURL
//     }
// }
