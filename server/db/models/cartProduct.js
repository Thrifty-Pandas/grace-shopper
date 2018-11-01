const Sequelize = require('sequelize')
const db = require('../db')

const CartProduct = db.define('cartProduct', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1
    }
  }
})

module.exports = CartProduct
