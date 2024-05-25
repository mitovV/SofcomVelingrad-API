import express from 'express'
import config from './config/config.js'

const app = express()

app.listen(config.PORT, console.log.bind(console, `Server is listening on port ${config.PORT}...`))
