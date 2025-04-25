namespace db.invoice;

using {
    cuid,
    managed,
    sap.common.CodeList
} from '@sap/cds/common';

using {db.order as order} from './order';

entity Invoice : cuid, managed {
    orderId : UUID;
    order   : Association to order.Order
                  on order.ID = orderId;
    total   : Double;
    date    : Date;
    status  : Association to Status; // No tiene un campo que lo conecte, igual funciona, es otro enfoque
}

entity Status : CodeList {
    key code    : Integer;
        invoice : Association to many Invoice on invoice.status = $self;
}
