const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {notEmpty: true}
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {notEmpty: true, len: [5, 500]}
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {isNumeric: true, min: 0}
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {isNumeric: true, min: 0}
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: '/test.jpg'
  }
})

module.exports = Product
