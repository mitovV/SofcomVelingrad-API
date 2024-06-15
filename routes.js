import { Router } from "express"
import categoryController from './controllers/categoryController.js'
import ringSizeController from './controllers/ringSizeController.js'
import errorController from './controllers/errorController.js'
import goldPriceController from './controllers/goldPriceController.js'

const router = Router()

router.use('/categories', categoryController)
router.use('/ring-sizes', ringSizeController)
router.use('/errors', errorController)
router.use('/gold-prices', goldPriceController)

export default router