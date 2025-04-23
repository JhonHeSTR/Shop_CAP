using {db.order as order} from '../../db/order';

service OrderService @(impl: './routes/order.routes.js') {
    entity Orders  as projection on order.Order;
    entity Details as projection on order.Detail;

    type Customer {
        ID       : UUID;
        document : String(10);
    }

    type Products {
        ID       : UUID;
        quantity : Integer;
        unitPrice: Double;
    }

    type Payload {
        customer : Customer;
        products : many Products;
    }

    action createOrder(payload : Payload) returns String;
}
