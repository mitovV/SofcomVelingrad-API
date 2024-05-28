import { Router } from "express"
import mainCategoryService from "../services/mainCategoryService.js"

const router = Router()

router.get('/all', (req, res) => {
    mainCategoryService.all().then(response => {
        res.status(200).json(response)
    }).catch(err => res.status(400).json({ err }))
})

export default router