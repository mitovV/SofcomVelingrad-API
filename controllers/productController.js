import { Router } from "express"
import productsService from '../services/productsService.js'

const router = Router()

router.get('/', (req, res) => {
    productsService.all()
    .then(response => res
        .status(200)
        .json(response)
    )
    .catch(err => res.status(400).json({ err }))
})

export default router