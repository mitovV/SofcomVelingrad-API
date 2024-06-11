import { Router } from "express"
import categoriesService from "../services/categoriesService.js"

const router = Router()

router.get('/main/all', (req, res) => {
    categoriesService.mainAll()
        .then(response => {
            res.status(200)
                .json(response)
        }).catch(err => res.status(400).json({ err }))
})

router.get('/sub/all', (req, res) => {
    categoriesService.subAll()
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