const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  shippingAddress: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },
  totalPrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {isNumeric: true, min: 0}
  },
  temporaryUserId: {
    type: Sequelize.STRING,
    allowNull: true
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  status: {
    type: Sequelize.ENUM('Created', 'Processing', 'Cancelled', 'Completed'),
    defaultValue: 'Created'
  }
})

module.exports = Order
