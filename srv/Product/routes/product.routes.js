const cds = require('@sap/cds');

const controller_product = require('../controller/product.controller');

module.exports = cds.service.impl(async function () {

    const controller = new controller_product();

    this.on('groupByCategory', controller.onGroupByCategory);
});