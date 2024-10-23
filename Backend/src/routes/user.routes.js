import {Router} from 'express'
import { userController } from '../controllers/user.controllers.js'
import { verifyToken } from '../middlewares/jwt.middleware.js'


const router = Router()

router.post('/register', userController.register)
router.post('/login', userController.login)
//Ruta protegida
router.get('/profile', verifyToken, userController.profile)

export default router