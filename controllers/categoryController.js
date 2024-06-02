import { Router } from "express"
import categoriesService from "../services/categoriesService.js"

const router = Router()

router.get('/all', (req, res) => {
    categoriesService.all()
        .then(response => {
            res.status(200)
                .json(response)
        }).catch(err => res.status(400).json({ err }))
})

router.get('/:id', (req, res) => {
    const id  = req.params.id

    categoriesService.getById(id).then(response => {
        res.status(200).json(response)
    }).catch(err => res.status(400).json({ err }))
})

export default router