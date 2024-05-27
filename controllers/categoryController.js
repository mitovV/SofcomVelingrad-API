import { Router } from "express";
import Category from "../data/models/Category.js";
const router = Router()

router.get('/', (req, res) => {
    Category.find({}).then(response => {
        res.status(200).json(response)
    })
})

export default router