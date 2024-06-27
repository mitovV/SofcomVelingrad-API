import { Router } from 'express'
import categoryController from './controllers/categoryController.js'
import ringSizeController from './controllers/ringSizeController.js'
import errorController from './controllers/errorController.js'
import goldPriceController from './controllers/goldPriceController.js'
import productController from './controllers/productController.js'
import goldCaratController from './controllers/goldCaratController.js'
import goldConditionController from './controllers/goldConditionController.js'

const router = Router()

router.use('/categories', categoryController)
router.use('/ring-sizes', ringSizeController)
router.use('/errors', errorController)
router.use('/gold-prices', goldPriceController)
router.use('/products', productController)
router.use('/gold-carats', goldCaratController)
router.use('/gold-conditions', goldConditionController)

export default router