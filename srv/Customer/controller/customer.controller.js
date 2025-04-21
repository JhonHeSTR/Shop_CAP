const cds = require('@sap/cds');

class CustomerController {

    constructor() { }

    // async before_read(req) {
    //     console.log('Before, Hi');   
    // }

    on_create(req) {

        const { Customers: customers } = this.entities;

        const data = req.data;

        try {

            cds.tx(async () => {

                const ID = cds.utils.uuid(); // uuid.v4(); 

                let result = await INSERT.into(customers).entries({
                    ID,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    document: data.document,
                });

                console.log(result);
            })

            return { success: true, message: 'Customer created' };

        } catch (err) {
            console.error('Transaction failed, rolled back:', err.message);
            return { success: false, error: err.message };
        }
    }

    // async after(req) {

    //  }
}

module.exports = CustomerController;