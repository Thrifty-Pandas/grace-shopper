const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  temporaryUserId: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
})

module.exports = Cart
