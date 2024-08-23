import { Router } from 'express'
import silverCaratsService from '../services/silverCaratsService.js'

const router = Router()

router.get('/all', (req, res) => {
    silverCaratsService.all()
        .then(response => res
            .status(200)
            .json(response)
        )
        .catch(err => res.status(400).json({ err }))
})

export default router