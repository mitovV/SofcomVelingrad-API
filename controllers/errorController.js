import { Router } from 'express'
import errorsService from '../services/errorsService.js'

const router = Router()

router.post('/', (req, res) => {
    let { error } = req.body
    
    errorsService.log(error)
        .then(err => res.status(201).json({ err }))
        .catch(err => res.status(400).json({ err }))
})

export default router