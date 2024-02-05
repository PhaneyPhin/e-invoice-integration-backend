import { LogOnError } from "../decorator/LogOnError";
import { InvoiceReceived } from "../entities/invoice-received.entity";
import { AppEvent } from "../enums/AppEvent";
import { eventEmitter } from "../lib/EventEmitter";

class EventHandler {
    @LogOnError
    async onInvoiceReceived(invoice: InvoiceReceived) {
        //handle websocket if want to use realtime invoice
        console.log('receive invoice', invoice)
    }
}

const eventHandler = new EventHandler
eventEmitter.on(AppEvent.INVOICE_RECEIVED, eventHandler.onInvoiceReceived)