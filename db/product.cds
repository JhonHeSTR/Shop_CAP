namespace db.product;

using {
    cuid,
    managed,
    sap.common.CodeList
} from '@sap/cds/common';

using {db.order as order} from './order';

entity Product : cuid, managed {
    name          : localized String(30);
    description   : localized String(100);
    price         : Double;
    stock         : Integer;
    category_code : Integer;
    category      : Association to Category
                        on category.code = category_code;
    status_code   : Integer;
    status        : Association to Status
                        on status.code = status_code;
    orderDetail   : Association to many order.OrderDetail
                        on orderDetail.product = $self;
}

entity Category : CodeList {
    key code : Integer;
        name : localized String(30);
}

entity Status : CodeList {
    key code : Integer;
        name : localized String(30);
}
