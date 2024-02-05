import express from 'express'
import { userController } from '../controllers/user.controller'
import invoiceReceivedController from '../controllers/invoice-received.controller'

const webhookRouter = express.Router()

webhookRouter.post('/invoice-received', invoiceReceivedController.receiveInvoice)

export default webhookRouter