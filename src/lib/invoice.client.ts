import axios, { Axios, AxiosInstance } from "axios";
import { CLIENT_ID, INVOICE_API_URL } from "../config";
import fs from 'fs'

export interface InvoiceClientOption {
    client_id: string;
    secret_key: string;
    api_url: string
}

export class InvoiceClient {
    private axios: AxiosInstance;
    private invoiceOption: InvoiceClientOption;
    private accessToken: string;

    constructor(option: InvoiceClientOption) {
        this.axios = axios.create({ baseURL:  option.api_url })
        this.invoiceOption = option
    }

    async generateAccessToken() {
        console.log(Buffer.from(`${this.invoiceOption.client_id}:${this.invoiceOption.secret_key}`).toString('base64') )
        const result = await this.axios.post('/token', {}, {
            headers: {
                Authorization: 'Basic ' + Buffer.from(`${this.invoiceOption.client_id}:${this.invoiceOption.secret_key}`).toString('base64') 
            }
        })

        console.log(result)
        this.accessToken = result.data.token
    }

    async createInvoice(invoice: any) {
        return await this.axios.post('/invoice', invoice, { headers: {
            'Authorization': `Bearer ${this.accessToken}`
        }})
    }

    async getInvoice(invoiceID: string) {
        const result = await this.axios.get(`invoice/${invoiceID}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        })

        return result.data
    }

    async downloadPdf(invoiceID: string) {
          return await this.axios({
            method: 'get',
            url: `/invoice/${invoiceID}/pdf`,
            responseType: 'stream',
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
          })
            .then((response) => {
              const writer = fs.createWriteStream(`invoice-pdf/${invoiceID}.pdf`); 
              response.data.pipe(writer);
          
              return new Promise((resolve, reject) => {
                writer.on('finish', resolve);
                writer.on('error', reject);
              });
            })
            .then(() => {
              console.log('PDF downloaded successfully');
            })
            .catch((error) => {
              console.error('Error downloading PDF:', error);
        });
    }

    async sendInvoice(invoiceID: string) {
        return await this.axios.post(`/invoice/send/${invoiceID}`, {}, { headers: {
            'Authorization': `Bearer ${this.accessToken}`
        }})
    }
}