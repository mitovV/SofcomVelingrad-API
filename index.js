import express from 'express'
import config from './config/config.js'
import Category from './data/models/Category.js'

const app = express()

import './config/mongoose.js'

import configuration from './config/express.js'
configuration(app)

import './data/seeding/categoriesSeeder.js'

app.listen(config.PORT, console.log.bind(console, `Server is listening on port ${config.PORT}...`))