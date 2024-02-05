import express from 'express'
import productController from '../controllers/product.controller'

const productRouter = express.Router()

productRouter.get('/', productController.list)

export default productRouter