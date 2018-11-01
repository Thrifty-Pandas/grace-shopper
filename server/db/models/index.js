const db = require('../db')
const User = require('./user')
const Category = require('./category')
const Product = require('./product')
const Reviews = require('./reviews')
const Order = require('./order')

const ProductCategory = db.define('productCategory')
const OrderProduct = db.define('OrderProduct')

Category.belongsToMany(Product, {through: ProductCategory})
Product.belongsToMany(Category, {through: ProductCategory})

Product.belongsToMany(Order, {through: OrderProduct})
Order.belongstoMany(Product, {through: OrderProduct})

User.hasMany(Order)
Order.belongsTo(User)

Reviews.belongsTo(Product)
Reviews.belongsTo(User)

// including the association on both models instead of just on Reviews so that we can access Sequelize Magic Methods on either model

Product.hasMany(Reviews)
User.hasMany(Reviews)

module.exports = {
  User,
  Product,
  Category,
  ProductCategory,
  Reviews
}
