import express from 'express'
import { userController } from '../controllers/user.controller'
import invoiceController from '../controllers/invoice.controller'

const invoiceRouter = express.Router()

invoiceRouter.post('/', invoiceController.createInvoice)
invoiceRouter.get('/:invoice_id/pdf', invoiceController.downloadPdf)
invoiceRouter.post('/:invoice_id/send', invoiceController.send)
invoiceRouter.get('/', invoiceController.list)

export default invoiceRouter