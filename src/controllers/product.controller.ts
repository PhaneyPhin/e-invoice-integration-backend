import { Request, Response } from "express";
import { ErrorHandlingWrapper } from "../decorator/ErrorHandlingWrapper";
import { SendTo } from "../decorator/SendTo";
import { InvoiceService } from "../services/invoice.service";
import { BaseController } from "./base.controller";
import { ProductService } from "../services/product.service";
import products from "../product";

export class ProductController extends BaseController {
    private readonly productService = new ProductService()

    @ErrorHandlingWrapper
    @SendTo
    async list(req: Request, Res: Response) {
        return {
            data: products
        }
    }
}

export default new ProductController