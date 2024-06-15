import { Router } from "express"
import goldPricesService from "../services/goldPricesService.js"

const router = Router()

router.get('/all', (req, res) => {
    goldPricesService.all()
        .then(response => res
            .status(200)
            .json({response})
        )
        .catch(err => res.status(400).json({ err }))

})

export default router