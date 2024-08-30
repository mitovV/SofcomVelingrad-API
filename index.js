import express from 'express'
import config from './config/config.js'
import router from './routes.js'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import './config/mongoose.js'

import configuration from './config/express.js'
configuration(app)

import './data/seeding/categoriesSeeder.js'
import './data/seeding/ringSizesSeeder.js'
import './data/seeding/goldCaratsSeeder.js'
import './data/seeding/silverCaratsSeeder.js'

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/api', router)

app.listen(config.PORT, console.log.bind(console, `Server is listening on port ${config.PORT}...`))