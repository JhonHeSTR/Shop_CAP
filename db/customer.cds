namespace db.customer;

entity Customer {
    key ID        : UUID;
    key document  : String(10);
        firstName : String(100) @mandatory;
        lastName  : String(100) @mandatory;
        phones    : Association to many Phone
                        on phones.customer = $self;
        email     : String(100) @mandatory;
        address   : Composition of many Address
                        on address.customer = $self;
}

entity Phone {
    key number           : String(10);
        code             : String(3);
        type             : PhoneType;
        customer         : Association to Customer
                               on  customer.ID       = customerId
                               and customer.document = customerDocument;
        customerId       : UUID;
        customerDocument : String(10);
}

type PhoneType : Integer enum {
    Mobile = 1;
    Office = 2;
    HOME = 3;
}

entity Address {
    key ID               : UUID;
        street           : String;
        city             : String;
        postalCode       : String;
        country          : String;
        customer         : Association to Customer
                               on  customer.ID       = customerId
                               and customer.document = customerDocument;
        customerId       : UUID;
        customerDocument : String(10);
}
