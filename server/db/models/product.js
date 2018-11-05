const Sequelize = require('sequelize')
const db = require('../db')

const Category = require('./category')
const Review = require('./review')

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

Product.eagerLoadCategoriesReviews = async productId => {
  const product = await Product.findById(productId, {
    include: [Category, Review]
  })
  return product
}

module.exports = Product
