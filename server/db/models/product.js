const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {allowEmpty: false}
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {allowEmpty: false, len: [50, 500]}
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {allowEmpty: false, min: 0}
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {allowEmpty: false, isNumeric: true, min: 0}
  },
  photo: {
    type: Sequelize.STRING,
    defaultValue: '/test.jpg'
  }
})

module.exports = Product
