import { Router } from 'express'
import productsService from '../services/productsService.js'

const router = Router()

router.get('/', (req, res) => {
    productsService.all()
    .then(response => res
        .status(200)
        .json(response)
    )
    .catch(err => res.status(400).json({ err }))
})

router.post('/', (req, res) => {
    let { categoryId, 
        categoryName, 
        material,
        weight,
        size,
        goldCarat,
        silverCarat,
        title,
        model,
        brand,
        ram,
        rom,
        price,
        description,
    } = req.body

    let files = req.files
console.log(req.body);
    
})

export default router