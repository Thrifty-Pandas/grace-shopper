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
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {isNumeric: true, min: 0}
  },
  temporaryUserId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  userId: {
    type: Sequelize.STRING,
    allowNull: true
  },
  status: {
    type: Sequelize.ENUM('pending', 'confirmed', 'shipped', 'delivered'),
    defaultValue: 'pending'
  }
})

module.exports = Order
