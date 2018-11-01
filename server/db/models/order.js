const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  shippingAddress: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      allowEmpty: false
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      allowEmpty: false,
      isEmail: true
    }
  },
  temporaryUserId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  status: {
    type: Sequelize.ENUM,
    defaultValue: 'pending',
    value: ['pending', 'confirmed', 'shipped', 'delivered']
  }
})

module.exports = Order
