import { Router } from "express"
import categoryController from './controllers/categoryController.js'
import ringSizeController from './controllers/ringSizeController.js'

const router = Router()

router.use('/categories', categoryController)
router.use('/ring-sizes', ringSizeController)

export default router