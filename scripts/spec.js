const report = require("../resources/lib_createReport")
let initialize = require ("../modules/InitializePage.js")
let login = require("../modules/login.js")
let product = require ("../modules/chooseProducts.js")
let cart = require ("../modules/cart.js")
let form = require("../modules/form.js")
let order = require("../modules/order.js")

describe('My Protractor Test', () => {
  it('Open the Saucedemo homepage', async () => {
    await (initialize.resolveURL())
  });
  it('Login in Saucedemo', async () => {
    await (login.login())
  });
  it('Add products to cart', async () => {
    await (product.product())
  });
  it('View cart', async () => {
    await (cart.cart())
  });
  it('Fill form', async () => {
    await (form.form())
  });
  it('Confirm Order', async () => {
    await (order.confirm())
  });
  it('Final Report', async () => {
    await report.createPathReport()
  })
});

