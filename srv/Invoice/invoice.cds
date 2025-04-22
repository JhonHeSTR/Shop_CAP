using {db.invoice as invoice} from '../../db/invoice';

service InvoiceService {
    entity Invoices as projection on invoice.Invoice;
}
