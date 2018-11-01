const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  temporaryUserId: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
})

module.exports = Cart
