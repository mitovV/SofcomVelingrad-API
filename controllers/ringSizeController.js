import { Router } from "express"
import ringSizesService from '../services/ringSizesService.js'

const router = Router()

router.get('/', (req, res) => {
    return ringSizesService.all()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => res.status(400).json({ err }))
})

router.post('/', (req, res) => {
    let { value } = req.params

    ringSizesService.create(value)
        .then(ringSize => {
            res.status(200).json({ _id: ringSize._id })
        })
        .catch(err => res.status(400).json({ err }))
})

export default router