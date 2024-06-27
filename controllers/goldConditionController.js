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

export default router