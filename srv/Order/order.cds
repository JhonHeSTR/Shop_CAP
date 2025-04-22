using {db.order as order} from '../../db/order';

service OrderService{
    entity Orders as projection on order.Order;
    entity OrdersDetails as projection on order.OrderDetail;
}