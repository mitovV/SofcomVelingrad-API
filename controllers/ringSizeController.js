import { Router } from 'express'
import ringSizesService from '../services/ringSizesService.js'

const router = Router()

router.get('/', (req, res) => {
    let { page, limit } = req.query
    let offset = (page - 1) * limit

    return ringSizesService.all(offset, limit)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => res.status(400).json({ err }))
})

router.get('/count', (req, res) => {
    return ringSizesService.count().then(response => {
        res.status(200).json(response)
    })
        .catch(err => res.status(400).json({ err }))
})

router.post('/', (req, res) => {
    let { size } = req.body

    ringSizesService.create(size)
        .then(ringSize => {
            res.status(201).json({ _id: ringSize._id })
        })
        .catch(err => res.status(400).json({ err }))
})

router.delete('/:id', (req, res) => {
    let id = req.params.id

    ringSizesService.deleteById(id)
        .then(response => res.status(202)
            .json(response))
        .catch(err => res.status(400).json({ err }))
})

router.patch('/:id', (req, res) => {
    let id = req.params.id
    let { size } = req.body

    ringSizesService.update(id, size)
        .then(response => res.status(200)
            .json(response))
        .catch(err => res.status(400).json({ err }))
})

router.get('/:id', (req, res) => {
    let id = req.params.id

    return ringSizesService.getById(id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => res.status(400).json({ err }))
})

export default router