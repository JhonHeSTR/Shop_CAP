const { entities } = require('@sap/cds');
const cds = require('@sap/cds');

class OrderController {

    constructor(entities) {
        this.entities = entities;
        this.init();
    }

    async init() {
        this.Orders = this.entities.Orders;
        this.Details = this.entities.Details;
        this.Products = entities['ProductService.Products']; // Manera de usar una tabla de otro contexto
    }

    async before_create(req) {

        const data = req.data.payload;

        try {
            const products = data.products;

            for (const product of products) {

                const stock = await cds.run(
                    SELECT.from(this.Products).columns('stock').where({ ID: product.ID })
                );

                if (stock[0].stock < product.quantity) {
                    req.error(400, 'Insufficient stock for product ' + product.ID);
                    // throw new Error('Insufficient stock for product ' + product.ID);
                }
            }

        } catch (err) {
            console.error('Transaction failed, rolled back:', err.message);
            return { success: false, error: err.message };
        }
    }

    async on_create(req) {

        const tx = cds.tx(req);
        const data = req.data.payload;
        const customer = data.customer;
        const products = data.products;

        try {
            const orderId = cds.utils.uuid();
            const detailsId = [];

            await tx.run(
                INSERT.into(this.Orders).entries({
                    ID: orderId,
                    date: new Date(),
                    total: 0,
                    customerId: customer.ID,
                    customerDocument: customer.document
                })
            );

            for (const product of products) {

                const detailId = cds.utils.uuid();

                await tx.run(
                    INSERT.into(this.Details).entries({
                        ID: detailId,
                        order_ID: orderId,
                        product_ID: product.ID,
                        quantity: product.quantity,
                        unitPrice: product.unitPrice
                    })
                );

                detailsId.push(detailId);

                await tx.run(
                    UPDATE(this.Orders).set({ total: { '+=': product.quantity * product.unitPrice } }).where({ ID: orderId })
                );

                await tx.run(
                    UPDATE(this.Products)
                        .set({ stock: { '-=': product.quantity } }).where({ ID: product.ID })
                );
            }

            return {
                success: true,
                message: 'Order created successfully',
                orderId,
                detailsId
            };

        } catch (err) {
            console.error('Transaction failed, rolled back:', err);
            return { success: false, error: err.message };
        }
    }
}

module.exports = OrderController;