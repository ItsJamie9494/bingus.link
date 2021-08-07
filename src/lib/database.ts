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

import mongoose from 'mongoose'

const USER = process.env.DB_USER
const PASSWORD = process.env.DB_PASSWORD
const HOST = process.env.DB_HOST
const DB = process.env.DB

const DB_URI = `mongodb+srv://${USER}:${encodeURIComponent(
    PASSWORD || ''
)}@${HOST}/${DB}?retryWrites=true&w=majority`

mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const connection = mongoose.connection

export default connection
