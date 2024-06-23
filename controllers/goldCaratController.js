import { Router } from 'express'
import goldCaratsService from '../services/goldCaratsService.js'

const router = Router()

router.get('/all', (req, res) => {
    goldCaratsService.all()
        .then(response => res
            .status(200)
            .json(response)
        )
        .catch(err => res.status(400).json({ err }))
})

export default router