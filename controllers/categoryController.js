import { Router } from 'express'
import categoriesService from '../services/categoriesService.js'

const router = Router()

router.get('/all/main', (req, res) => {
    categoriesService.mainAll()
        .then(response => {
            res.status(200)
                .json(response)
        }).catch(err => res.status(400).json({ err }))
})

router.get('/count', (req, res) => {
    return categoriesService.count().then(response => {
        res.status(200).json(response)
    })
        .catch(err => res.status(400).json({ err }))
})

router.get('/all', (req, res) => {
    let page = Number(req.query.page) || 0
    let limit = Number(req.query.limit) || 0

    let offset = ((page - 1) * limit) || 0

    categoriesService.all(offset, limit)
        .then(response => {
            res.status(200)
                .json(response)
        }).catch(err => res.status(400).json({ err }))
})

router.post('/', (req, res) => {
    let { name, parentId, secondParentId } = req.body

    categoriesService.create(name, parentId, secondParentId)
        .then(category => {
            res.status(201).json({ _id: category._id })
        })
        .catch(err => res.status(400).json({ err }))
})

router.get('/:id', (req, res) => {
    const id = req.params.id

    categoriesService.getById(id).then(response => {
        res.status(200).json(response)
    }).catch(err => res.status(400).json({ err }))
})

router.patch('/:id', (req, res) => {
    let id = req.params.id
    let { name } = req.body

    categoriesService.update(id, name)
        .then(response => res.status(200)
            .json(response))
        .catch(err => res.status(400).json({ err }))
})

router.delete('/:id', (req, res) => {
    let id = req.params.id

    categoriesService.deleteById(id)
        .then(response => res
            .status(200)
            .json(response))
        .catch(err => res.status(400).json({ err }))
})

export default router