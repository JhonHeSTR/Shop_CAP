const cds = require('@sap/cds');
const controller_order = require('../controller/order.controller');
const controller_createOrder = require('../controller/createOrder.controller');

module.exports = cds.service.impl(async function () {

    const { Orders, Details } = this.entities;

    const order_controller = new controller_order({ Orders, Details }); // Pasar las entidades al controlador
    const createOrder_controller = new controller_createOrder({ Orders, Details }); // Pasar las entidades al controlador

    // bind pasa la referencia del controlador

    this.before('CREATE', Orders, order_controller.before_create.bind(order_controller));
    this.on('CREATE', Orders, order_controller.on_create.bind(order_controller));

    this.before('createOrder', createOrder_controller.before_create.bind(createOrder_controller));
    this.on('createOrder', createOrder_controller.on_create.bind(createOrder_controller));
});