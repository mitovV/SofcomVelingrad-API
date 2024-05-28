import { Router } from "express"
import mainCategoryController from './controllers/mainCategoryController.js'

const router = Router()

router.use('/categories/main', mainCategoryController)

export default router