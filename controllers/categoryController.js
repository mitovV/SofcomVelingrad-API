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

router.post('/main', (req, res) => {
    let { name } = req.body

    categoriesService.createMain(name)
    .then(category => {
        res.status(201).json({ _id: category._id })
    })
    .catch(err => res.status(400).json({ err }))
})

router.get('/sub/all', (req, res) => {
    categoriesService.subAll()
        .then(response => {
            res.status(200)
                .json(response)
        }).catch(err => res.status(400).json({ err }))
})

router.get('/ring/all', (req, res) => {
    categoriesService.ringAll()
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

router.patch('/main/:id', (req, res) => {
    let id = req.params.id
    let { name } = req.body

    categoriesService.updateMain(id, name)
        .then(response => res.status(200)
            .json(response))
        .catch(err => res.status(400).json({ err }))
})

router.patch('/sub/:id', (req, res) => {
    let id = req.params.id
    let { name } = req.body

    categoriesService.updateSub(id, name)
        .then(response => res.status(200)
            .json(response))
        .catch(err => res.status(400).json({ err }))
})

router.patch('/ring/:id', (req, res) => {
    let id = req.params.id
    let { name } = req.body

    categoriesService.updateRing(id, name)
        .then(response => res.status(200)
            .json(response))
        .catch(err => res.status(400).json({ err }))
})

router.delete('/ring/:id', (req, res) => {
    let id = req.params.id

    categoriesService.deleteRingById(id)
        .then(response => res.status(202)
            .json(response))
        .catch(err => res.status(400).json({ err }))
})

router.delete('/main/:id', (req, res) => {
    let id = req.params.id
    
    categoriesService.deleteMainById(id)
        .then(response => res.status(202)
            .json(response))
        .catch(err => res.status(400).json({ err }))
})

router.delete('/sub/:id', (req, res) => {
    let id = req.params.id
    
    categoriesService.deleteSubById(id)
        .then(response => res.status(202)
            .json(response))
        .catch(err => res.status(400).json({ err }))
})

export default router