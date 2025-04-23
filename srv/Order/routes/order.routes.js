const cds = require('@sap/cds');
const controller_order = require('../controller/order.controller');

module.exports = cds.service.impl(async function () {

    const { Orders, Details } = this.entities;

    const controller = new controller_order({ Orders, Details }); // Pasar las entidades al controlador

    // bind pasa la referencia del controlador

    // this.before('CREATE', Orders, controller.before_create.bind(controller));

    // this.on('CREATE', Orders, controller.on_create.bind(controller));

    this.before('createOrder',controller.before_create.bind(controller));
    this.on('createOrder', controller.on_create.bind(controller));
});