import express from 'express'
import invoiceReceivedController from '../controllers/invoice-received.controller'

const invoiceReceivedRouter = express.Router()

invoiceReceivedRouter.get('/:invoice_id/pdf', invoiceReceivedController.downloadPdf)
invoiceReceivedRouter.get('/', invoiceReceivedController.list)

export default invoiceReceivedRouter