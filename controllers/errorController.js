import { Router } from "express"

const router = Router()

router.post('/', (req, res) => {
    let error = req.body
    console.log(error);
    errorsService.log(error)
    .then(err => res.status(201).json({err}))
    .catch(err => res.status(400).json({ err }))
})

export default router