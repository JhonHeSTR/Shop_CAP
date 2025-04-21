using {db.customer as customer} from '../../db';

service CustomerService {
    entity Customers as projection on customer.Customer;
}
