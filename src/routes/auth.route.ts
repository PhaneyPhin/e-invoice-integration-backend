import express from 'express'
import { authController } from '../controllers/auth.controller'
import authMiddleware from '../middlewares/auth.middleware'

const authRouter = express.Router()

authRouter.post('/login', authController.login)
authRouter.get('/me', authMiddleware, authController.getProfile)
authRouter.post('/register', authController.register)

export default authRouter