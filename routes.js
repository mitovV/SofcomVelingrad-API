import { Router } from "express"
import categoryController from './controllers/categoryController.js'

const router = Router()

router.use('/categories/', categoryController)

export default router