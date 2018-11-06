const Sequelize = require('sequelize')
const db = require('../db')
const {Order, OrderProduct, Product} = require('../db/models')

const Cart = db.define('cart', {
  temporaryUserId: {
    type: Sequelize.STRING,
    allowNull: true
  }
})

Cart.prototype.createOrder = async function(orderInfo) {
  //create an order
  const order = await Order.create({ ...orderInfo })
  // const cart = await Cart.findById(this.id, { include: [Product] })

  await Promise.all(

    this.products.map(product =>
      OrderProduct.create({productId:product.id,orderId:order.id,price:product.price,quantity:})
      )

  )
  //create orderProducts
}

module.exports = Cart
