using {db.customer as customer} from '../../db';

service CustomerService @(
    impl    : './routes/customer.routes',
    requires: 'admin'
) {
    entity Customers as projection on customer.Customer;
    entity Phones    as projection on customer.Phone;
}
