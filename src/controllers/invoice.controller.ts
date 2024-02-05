import { Request, Response } from "express";
import { ErrorHandlingWrapper } from "../decorator/ErrorHandlingWrapper";
import { SendTo } from "../decorator/SendTo";
import { InvoiceService } from "../services/invoice.service";
import { BaseController } from "./base.controller";
import fs from 'fs'
import path from "path";

export class InvoiceController extends BaseController {
    private readonly invoiceService = new InvoiceService()

    @ErrorHandlingWrapper
    @SendTo
    async createInvoice(req: Request, Res: Response) {
        const invoice = await this.invoiceService.createInvoice(req.body);
        return invoice
    }

    @ErrorHandlingWrapper
    @SendTo
    async list(req: Request, Res: Response) {
        const invoice = await this.invoiceService.list(Number(req.query.page || 1), { status: req.query.status || 'GENERATED'});
        return invoice
    }

    @ErrorHandlingWrapper
    async downloadPdf(req: Request, res: Response) {
        const pdfFilePath = path.join(__dirname, '../../invoice-pdf/'+req.params.invoice_id + '.pdf');

        // Check if the file exists
        if (!fs.existsSync(pdfFilePath)) {
            await this.invoiceService.download(req.params.invoice_id)
        }

        // Set the appropriate headers for the response
        res.setHeader('Content-disposition', 'attachment; filename=file.pdf');
        res.setHeader('Content-type', 'application/pdf');

        // Send the PDF file
        const stream = fs.createReadStream(pdfFilePath);
        stream.pipe(res);
    }

    @ErrorHandlingWrapper
    @SendTo
    async send(req: Request, res: Response) {
        console.log
        return this.invoiceService.sendInvoice(req.params.invoice_id)
    }
}

export default new InvoiceController