import express from 'express'
import { userController } from '../controllers/user.controller'

const userRouter = express.Router()

userRouter.get('/', userController.getUser)
userRouter.post('/', userController.createUser)
userRouter.get('/:userId', userController.getUserDetail)
userRouter.put('/:userId', userController.getUserDetail)
userRouter.delete('/:userId', userController.getUserDetail)

userRouter.get('/404', userController.error404Page)

export default userRouter