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
import * as dotenv from 'dotenv'
dotenv.config()
import bodyParser from 'body-parser'
import path from 'path'
import pug from 'pug'

// Routes
import connection from './lib/database'
import redirect from './routes/redirect'
import sourceRedirect from './routes/sourceRedirect'
import contents from './routes/contents'
import hitCounts from './routes/hitCounts'
import url from './routes/url'
import generateLink from './routes/ui/generateLink'

const app = express()
app.set('views', path.resolve('templates'))
app.set('view engine', 'pug')

const port = process.env.PORT || 5000

connection.once('open', () => console.log('✅ Database Connected'))
connection.on('error', () => console.error('❌ Database Error'))

app.use(bodyParser.urlencoded({
    extended: false
}))
app.get('/', (req: express.Request, res: express.Response) => {
    res.setHeader('Permissions-Policy', 'interest-cohort=()')
    res.render('generator', { title: process.env.instanceName, baseUrl: process.env.baseURL })
})
app.get('/license', (req: express.Request, res: express.Response) => {
    res.setHeader('Permissions-Policy', 'interest-cohort=()')
    res.render('static/license', { title: process.env.instanceName, baseUrl: process.env.baseURL })
})
app.get('/privacy', (req: express.Request, res: express.Response) => {
    res.setHeader('Permissions-Policy', 'interest-cohort=()')
    res.render('static/privacy', { title: process.env.instanceName, baseUrl: process.env.baseURL })
})
app.get('/abuse', (req: express.Request, res: express.Response) => {
    res.setHeader('Permissions-Policy', 'interest-cohort=()')
    res.render('static/abuse', { title: process.env.instanceName, baseUrl: process.env.baseURL })
})
app.use('/', redirect)
app.use('/app/', generateLink)
app.use('/source', sourceRedirect)
app.use('/where/', contents)
app.use('/hits/', hitCounts)
app.use('/api/url', url)

// Render the embed preview script
if (process.env.NODE_ENV === 'production') {
    app.get('/js/embed.js', (req: express.Request, res: express.Response) => {
        res.setHeader('Permissions-Policy', 'interest-cohort=()')
        res.sendFile(path.resolve('./dist/embedPreview.js'))
    })
}

app.use(express.static(path.resolve('static'), {
    setHeaders: function(res: express.Response, path) {
        res.set('Permissions-Policy', 'interest-cohort=()')
    }
}))

// Error Pages
app.use((req: express.Request, res: express.Response) => {
    res.setHeader('Permissions-Policy', 'interest-cohort=()')
    return res.status(404).render('404', { title: '404', message: `How you got here is a mystery. Let's get you back.`, baseUrl: process.env.baseURL, btnMessage: 'Go Back' })
})


app.listen(port, () => {
    console.log(`🚀 Server Started, listening on port ${port}`)
})