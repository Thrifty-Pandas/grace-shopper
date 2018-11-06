const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  temporaryUserId: {
    type: Sequelize.STRING,
    allowNull: true
  }
})

Cart.prototype.createOrder = function(orderInfo) {}

module.exports = Cart
