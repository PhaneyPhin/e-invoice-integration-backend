import dataSource from "../database/dataSource";
import paginate from "../repository/pagination";
import { CLIENT_ID, INVOICE_API_URL, SECRET_KEY } from "../config";
import { InvoiceClient } from "../lib/invoice.client";
import { ProductService } from "./product.service";
import { PaginationService } from "./pagination.service";
import { InvoiceReceived } from "../entities/invoice-received.entity";
import { eventEmitter } from "../lib/EventEmitter";
import { AppEvent } from "../enums/AppEvent";

export class InvoiceReceivedService {
    private readonly invoiceRepository = dataSource.getRepository(InvoiceReceived).extend(paginate)
    private readonly paginationService = new PaginationService()
    private invoiceClient: InvoiceClient;

    constructor() {
        this.invoiceClient = new InvoiceClient({
            client_id: CLIENT_ID,
            api_url: INVOICE_API_URL,
            secret_key: SECRET_KEY
        })
    }

    async saveReceivedInvoice(invoiceID: string) {
        try {
            await this.invoiceClient.generateAccessToken()
            const invoice = await this.invoiceClient.getInvoice(invoiceID)

            const savedInvoice = await this.invoiceRepository.save(invoice)
            await this.invoiceClient.downloadPdf(savedInvoice.invoice_id)
            eventEmitter.emit(AppEvent.INVOICE_RECEIVED, savedInvoice)
        } catch (e) {
            console.log('invalid invoice from webhook', e)
        }
    }

    async list(page = 1, params: any = {}) {
        const query = await this.invoiceRepository.createQueryBuilder()
            .where(params)
            .orderBy('updated_at', 'DESC')
        
        return await this.paginationService.getPagination(page, 10, query)
    }

    async download(invoiceID: string) {
        await this.invoiceClient.generateAccessToken()
        await this.invoiceClient.downloadPdf(invoiceID)
    }
}