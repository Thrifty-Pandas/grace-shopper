const db = require('../db')
const User = require('./user')
const Category = require('./category')
const Product = require('./product')
const Review = require('./review')
const Order = require('./order')
const Cart = require('./cart')
const CartProduct = require('./cartProduct')
const ProductCategory = db.define('productCategory')
const OrderProduct = db.define('OrderProduct')

Category.belongsToMany(Product, {through: ProductCategory})
Product.belongsToMany(Category, {through: ProductCategory})

Product.belongsToMany(Order, {through: OrderProduct})
Order.belongsToMany(Product, {through: OrderProduct})

User.hasMany(Order)

// Review.belongsTo(Product, {
//   onDelete: 'CASCADE',
//   foreignKey: {name: 'productId', allowNull: false}
// })
// Review.belongsTo(User, {
//   onDelete: 'CASCADE',
//   foreignKey: {name: 'userId', allowNull: false}
// })

//Product - Review
Product.hasMany(Review)
Review.belongsTo(Product)

//User - Review
User.hasMany(Review)
Review.belongsTo(User)

//Product - Cart
Product.belongsToMany(Cart, {through: CartProduct})
Cart.belongsToMany(Product, {through: CartProduct})

Cart.belongsTo(User, {constraints: false, foreignKeyConstraint: false}) //allow a null foreignkey userId to exist on an instance of Cart

// including the association on both models instead of just on Review so that we can access Sequelize Magic Methods on either model

// Product.hasMany(Review)
// User.hasMany(Review)

module.exports = {
  User,
  Product,
  Category,
  ProductCategory,
  Review,
  Cart,
  CartProduct
}
