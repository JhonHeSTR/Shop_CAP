using {db.customer as customer} from '../../db';

service CustomerService @(
    impl    : './routes/customer.routes',
    requires: 'admin'
) {
    entity Customers as projection on customer.Customer;
    entity Phones    as projection on customer.Phone;
    entity Addresses as projection on customer.Address;

    type AddressInfo {
        ID               : UUID;
        city             : String;
        street           : String;
        country          : String;
        postalCode       : String;
        customerId       : String;
        customerDocument : String;
    }

    function getAddresses(document : String, ID : String) returns array of AddressInfo;
}
