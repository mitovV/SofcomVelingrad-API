import { Router } from 'express'
import goldConditionsService from '../services/goldConditionsService.js'

const router = Router()

router.get('/all', (req, res) => {
    goldConditionsService.all()
        .then(response => res
            .status(200)
            .json(response)
        )
        .catch(err => res.status(400).json({ err }))
})

router.post('/', (req, res) => {
    let { name } = req.body

    goldConditionsService.create(name)
        .then(gC => {
            res.status(201).json({ _id: gC._id })
        })
        .catch(err => res.status(400).json({ err }))
})

export default router