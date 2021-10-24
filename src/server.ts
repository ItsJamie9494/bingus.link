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
import { urlencoded } from 'body-parser'
import path from 'path'
import pug from 'pug'

// Routes
import connection from './lib/database'
import redirect from './routes/redirect'
import sourceRedirect from './routes/source'
import contents from './routes/where'
import hitCounts from './routes/hits'
import url from './routes/api/url'
import generateLink from './routes/app/generateLink'
import { env } from './env'

const app = express()
app.set('views', path.resolve('templates'))
app.set('view engine', 'pug')

const port = process.env.PORT || 5000

connection.once('open', () => console.log('✅ Database Connected'))
connection.on('error', () => console.error('❌ Database Error'))

app.use(
    urlencoded({
        extended: false,
    })
)

app.use(
    express.static(path.resolve('static'), {
        setHeaders: function (res: express.Response, path) {
            res.set('Permissions-Policy', 'interest-cohort=()')
        },
    })
)
app.get('/', (req: express.Request, res: express.Response) => {
    res.setHeader('Permissions-Policy', 'interest-cohort=()')
    res.render('generator', {
        title: env.instance.name,
        baseUrl: env.instance.base_url,
    })
})
app.get('/manage/login', (req: express.Request, res: express.Response) => {
    res.setHeader('Permissions-Policy', 'interest-cohort=()')
    res.render('admin/login', {
        title: env.instance.name,
        baseUrl: env.instance.base_url,
    })
})
app.get('/license', (req: express.Request, res: express.Response) => {
    res.setHeader('Permissions-Policy', 'interest-cohort=()')
    res.render('static/license', {
        title: env.instance.name,
        baseUrl: env.instance.base_url,
    })
})
app.get('/privacy', (req: express.Request, res: express.Response) => {
    res.setHeader('Permissions-Policy', 'interest-cohort=()')
    res.render('static/privacy', {
        title: env.instance.name,
        baseUrl: env.instance.base_url,
    })
})
app.get('/abuse', (req: express.Request, res: express.Response) => {
    res.setHeader('Permissions-Policy', 'interest-cohort=()')
    res.render('static/abuse', {
        title: env.instance.name,
        baseUrl: env.instance.base_url,
    })
})
app.use('/', redirect)
app.use('/app/', generateLink)
app.use('/source', sourceRedirect)
app.use('/where/', contents)
app.use('/hits/', hitCounts)
app.use('/api/url', url)

// Render the embed preview script
app.get('/js/embed.js', (req: express.Request, res: express.Response) => {
    res.setHeader('Permissions-Policy', 'interest-cohort=()')
    res.sendFile(path.resolve('./dist/embedPreview.js'))
})

// Error Pages
app.use((req: express.Request, res: express.Response) => {
    res.setHeader('Permissions-Policy', 'interest-cohort=()')
    return res.status(404).render('404', {
        title: '404',
        message: `How you got here is a mystery. Let's get you back.`,
        baseUrl: env.instance.base_url,
        btnMessage: 'Go Back',
    })
})

app.listen(port, () => {
    console.log(`
🚀 Server Started, listening on port ${port}

➡️  http://localhost:${port}
➡️  http://127.0.0.1:${port}
`)
})
