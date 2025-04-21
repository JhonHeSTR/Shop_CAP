const cds = require('@sap/cds');
const controller_customer = require('../controller/customer.controller');

module.exports = cds.service.impl(async function () {

    const { Customers: customers } = this.entities;

    const controller = new controller_customer();

    // this.before('READ', customers, controller.before_read);

    this.on('CREATE', customers, controller.on_create);

    this.on('getAddresses', controller.getAddresses);
});