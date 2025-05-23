const cds = require('@sap/cds');

class CustomerController {

    constructor() { }

    // async before_read(req) {
    //     console.log('Before, Hi');   
    // }

    async on_create(req) {

        const { Customers: customers, Phones: phones } = this.entities;

        const data = req.data;

        try {

            await cds.tx(async () => {

                const ID = cds.utils.uuid(); // uuid.v4(); 

                const exist_document = await SELECT.from(customers).where({ document: data.document });

                if (exist_document.length > 0) {
                    throw new Error(`Error! The document: ${data.document}, is already in the system.`);
                }

                await INSERT.into(customers).entries({
                    ID,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    document: data.document,
                    address: data.address // Composition
                });

                if (data.phones && data.phones.length > 0) {

                    const data_phones = data.phones.map(phone => ({
                        customerId: ID,
                        customerDocument: data.document,
                        ...phone
                    }));

                    await INSERT.into(phones).entries(data_phones);
                }

            });

            return { success: true, message: 'Customer created' };

        } catch (err) {
            console.error('Transaction failed, rolled back:', err.message);
            return { success: false, error: err.message };
        }
    }

    async getAddresses(req) {

        const { Customers: customers } = this.entities;
        const { document, ID } = req.data;

        try {

            const filters = [
                { key: "ID", value: ID },
                { key: "document", value: document }
            ];

            const filter = filters.find(f => f.value);

            if (!filter) throw new Error('The ID or document is required to perform the query');

            console.log(`${filter.key}: ${filter.value}`);

            const result = await SELECT.from(customers)
                .columns(a => {
                    a.address(b => {
                        b.ID,
                            b.street,
                            b.city,
                            b.postalCode,
                            b.country,
                            b.customerId,
                            b.customerDocument
                    })
                })
                .where(`${filter.key} = '${filter.value}'`);

            return result;

        } catch (err) {
            console.error('Transaction failed, rolled back:', err.message);
            return { success: false, error: err.message };
        }
    }

    // async after(req) {

    //  }
}

module.exports = CustomerController;