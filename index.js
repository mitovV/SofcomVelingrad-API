import express from 'express'
import config from './config/config.js'
import router from './routes.js'

const app = express()

import './config/mongoose.js'

import configuration from './config/express.js'
configuration(app)

import './data/seeding/categoriesSeeder.js'
import './data/seeding/ringSizesSeeder.js'
import './data/seeding/goldCaratsSeeder.js'
import './data/seeding/silverCaratsSeeder.js'

app.use('/api', router)

app.listen(config.PORT, console.log.bind(console, `Server is listening on port ${config.PORT}...`))