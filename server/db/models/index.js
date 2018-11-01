const db = require('../db')
const User = require('./user')
const Category = require('./category')
const Product = require('./product')
const Reviews = require('./reviews')
const Cart = require('./cart')
const CartProduct = require('./cartProduct')

const ProductCategory = db.define('productCategory')
Category.belongsToMany(Product, {through: ProductCategory})
Product.belongsToMany(Category, {through: ProductCategory})

Reviews.belongsTo(Product, {
  onDelete: 'CASCADE',
  foreignKey: {name: 'product_id', allowNull: false}
})
Reviews.belongsTo(User, {
  onDelete: 'CASCADE',
  foreignKey: {name: 'user_id', allowNull: false}
})
Product.belongsToMany(Cart, {through: CartProduct})
Cart.belongsToMany(Product, {through: CartProduct})

Cart.belongsTo(User, {constraints: false, foreignKeyConstraint: false}) //allow a null foreignkey userId to exist on an instance of Cart

// including the association on both models instead of just on Reviews so that we can access Sequelize Magic Methods on either model

Product.hasMany(Reviews)
User.hasMany(Reviews)

module.exports = {
  User,
  Product,
  Category,
  ProductCategory,
  Reviews,
  Cart,
  CartProduct
}
