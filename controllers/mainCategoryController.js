import { Router } from "express";
import MainCategory from "../data/models/MainCategory.js";
const router = Router()

router.get('/all', (req, res) => {
    MainCategory.find({}).then(response => {
        res.status(200).json(response)
    })
})

export default router