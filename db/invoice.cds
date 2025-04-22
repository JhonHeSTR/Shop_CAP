namespace db.invoice;

using {
    cuid,
    managed
} from '@sap/cds/common';

using {db.order as order} from './order';

entity Invoice : cuid, managed {
    orderId : UUID;
    order   : Association to order.Order
                  on order.ID = orderId;
    total   : Double;
    date    : Date;
}
