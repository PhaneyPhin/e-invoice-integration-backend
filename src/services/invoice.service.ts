import dataSource from "../database/dataSource";
import paginate from "../repository/pagination";
import { CLIENT_ID, INVOICE_API_URL, SECRET_KEY } from "../config";
import { InvoiceClient } from "../lib/invoice.client";
import { Invoice } from "../entities/invoice.entity";
import { VAT } from "../product";
import { ProductService } from "./product.service";
import moment from 'moment'
import { Exception } from "../exception/Exception";
import { PaginationService } from "./pagination.service";

export class InvoiceService {
    private readonly invoiceRepository = dataSource.getRepository(Invoice).extend(paginate)
    private readonly paginationService = new PaginationService()
    private invoiceClient: InvoiceClient;
    private readonly productService = new ProductService();


    constructor() {
        this.invoiceClient = new InvoiceClient({
            client_id: CLIENT_ID,
            api_url: INVOICE_API_URL,
            secret_key: SECRET_KEY
        })
    }

    prepareInvoiceData(data: any) {
        let subTotal = 0;
        const invoiceLines = data.invoice_lines.map((invoiceLine: any) => {
            const product = this.productService.find(invoiceLine.id)
            const line_extension_amount = product.price * invoiceLine.quantity
            
            let vatBase = line_extension_amount
            console.log('vatBase==>', vatBase)
            let totalTax = 0;
            const taxes = product.tax_categories.map((tax) => {
                if (tax.tax_scheme != VAT.tax_scheme) {
                    tax.tax_amount = line_extension_amount * tax.percent / 100
                    vatBase += tax.tax_amount
                } else {
                    tax.tax_amount = vatBase * tax.percent / 100.0
                    console.log('vatBase==>', tax)
                }

                totalTax += tax.tax_amount
                return { ...tax};
            })
            subTotal += line_extension_amount;
            console.log(JSON.stringify({
                id: product.id,
                quantity: invoiceLine.quantity,
                quantity_unit_code: 'XBF',
                line_extension_amount: line_extension_amount,
                price: product.price,
                item: {
                  description: product?.description,
                  name: product.name,
                  tax_categories: taxes
                }
              }))
            return {
                id: product.id,
                quantity: invoiceLine.quantity,
                quantity_unit_code: 'XBF',
                line_extension_amount: line_extension_amount,
                price: product.price,
                item: {
                  description: product?.description,
                  name: product.name,
                  tax_categories: taxes
                }
              }
        })
        console.log(JSON.stringify(invoiceLines))
        return {
            currency: "USD",
            due_date: moment().add(2, 'months').format('YYYY-MM-DD'),
            buyer_vat_tin: data.buyer_vat_tin,
            sub_total: subTotal,
            invoice_lines: invoiceLines
         }
    }

    async createInvoice(invoiceData: any) {
       try {
        await this.invoiceClient.generateAccessToken()
        invoiceData = this.prepareInvoiceData(invoiceData)
        console.log(JSON.stringify(invoiceData))
        const response = await this.invoiceClient.createInvoice(invoiceData)
        const invoice = response.data.data
        await this.invoiceClient.downloadPdf(invoice.invoice_id)
        
        return await this.invoiceRepository.save(invoice)
       } catch (e: any) {
         throw new Exception(e.response.status, '', e.response.data)
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

    async sendInvoice(invoiceID: string) {
        const invoice = await this.invoiceRepository.findOneByOrFail({ invoice_id: invoiceID })
        await this.invoiceClient.generateAccessToken()
        await this.invoiceClient.sendInvoice(invoiceID)
        invoice.status = 'SENT'
        await this.invoiceRepository.save(invoice)
    }
}