import mongoose from 'mongoose'
import config from './config.js'

mongoose.connect(config.DB_URI)

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', console.log.bind(console, 'DB is connected!'))
