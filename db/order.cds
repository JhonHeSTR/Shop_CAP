namespace db.order;

using {
    managed,
    cuid
} from '@sap/cds/common';

using {db.customer as customer} from './customer';
using {db.product as product} from './product';

entity Order : cuid, managed {
    customerId       : UUID;
    customerDocument : String(10);
    customer         : Association to customer.Customer
                           on  customer.ID       = customerId
                           and customer.document = customerDocument;
    total            : Double;
    date             : Date;
    detail      : Association to many Detail
                           on detail.order = $self;
}

entity Detail : cuid, managed {
    product   : Association to product.Product;
    order     : Association to Order;
    quantity  : Integer;
    unitPrice : Double;
}
