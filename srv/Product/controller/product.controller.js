const cds = require('@sap/cds');

class ProductController {

    async onGroupByCategory() {

        const { Products } = this.entities;

        try {
            const result = await cds.run(SELECT.from(Products).columns('category_code', 'count(*) as total').groupBy('category_code'));
            return { success: true, result };
        } catch (err) {
            console.error('Transaction failed, rolled back:', err.message);
            return { success: false, error: err.message };
        }
    }
}

module.exports = ProductController;