const Sequelize = require('sequelize')
const db = require('../db')
// const {Order, OrderProduct, Product} = require('../models')
const Order = require('./order')
const OrderProduct = require('./orderProduct')
const Product = require('./product')

const Cart = db.define('cart', {
  temporaryUserId: {
    type: Sequelize.STRING,
    allowNull: true
  }
})

Cart.prototype.createOrder = async function({orderInfo}) {
  //create an order
  console.log('orderInfo in instance method: ', orderInfo)
  const order = await Order.create({...orderInfo})
  const cart = await Cart.findById(this.id, {include: [Product]})

  //create orderProducts
  await Promise.all(
    cart.products.map(product => {
      OrderProduct.create({
        productId: product.id,
        orderId: order.id,
        price: product.price,
        quantity: product.cartProduct.quantity
      })
    })
  )
}

module.exports = Cart
