import cors from 'cors'

let options = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

export default (app) => {
    app.use(cors(options))
}