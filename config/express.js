import cors from 'cors'
import { json } from 'express'

let options = {
    origin: ['http://localhost:3000', 'http://localhost:4173'],
    optionsSuccessStatus: 200
}

export default (app) => {
    app.use(cors(options))
    app.use(json())
}