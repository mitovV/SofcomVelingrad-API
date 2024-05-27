import { Router } from "express"
import categoryContoller from './controllers/categoryController.js'

const router = Router()

router.use('/categories', categoryContoller)

export default router