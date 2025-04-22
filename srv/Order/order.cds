using {db.order as order} from '../../db/order';

service OrderService{
    entity Orders as projection on order.Order;
    entity Details as projection on order.Detail;
}