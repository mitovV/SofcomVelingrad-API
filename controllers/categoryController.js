import { Router } from "express";
import MainCategory from "../data/models/MainCategory.js";
const router = Router()

router.get('/', (req, res) => {
    MainCategory.find({}).then(response => {
        res.status(200).json(response)
    })
})

export default router