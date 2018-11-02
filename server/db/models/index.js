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

//Category - Product
Category.belongsToMany(Product, {through: ProductCategory})
Product.belongsToMany(Category, {through: ProductCategory})

//Product - Order
Product.belongsToMany(Order, {through: OrderProduct})
Order.belongsToMany(Product, {through: OrderProduct})

//Order - User
Order.belongsTo(User)
User.hasMany(Order)

<<<<<<< HEAD
=======
//Product - Review
//deleting a product deletes all of the associated reviews
//reviews MUST be associated with a product
Product.hasMany(Review)
>>>>>>> master
Review.belongsTo(Product, {
  onDelete: 'CASCADE',
  foreignKey: {name: 'productId', allowNull: false}
})
<<<<<<< HEAD
=======

//User - Review
//deleting a user deletes all of the associated reviews
//reviews MUST be associated with a user
User.hasMany(Review)
>>>>>>> master
Review.belongsTo(User, {
  onDelete: 'CASCADE',
  foreignKey: {name: 'userId', allowNull: false}
})

//Product - Cart
Product.belongsToMany(Cart, {through: CartProduct})
Cart.belongsToMany(Product, {through: CartProduct})

<<<<<<< HEAD
Cart.belongsTo(User, {constraints: false, foreignKeyConstraint: false}) //allow a null foreignkey userId to exist on an instance of Cart

// including the association on both models instead of just on Review so that we can access Sequelize Magic Methods on either model

Product.hasMany(Review)
User.hasMany(Review)
=======
//Cart - User
Cart.belongsTo(User)

// including the association on both models instead of just on Review so that we can access Sequelize Magic Methods on either model
>>>>>>> master

module.exports = {
  User,
  Product,
  Category,
  ProductCategory,
  Review,
  Cart,
  CartProduct,
  Order,
  OrderProduct
}
