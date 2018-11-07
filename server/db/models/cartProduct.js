const Sequelize = require('sequelize')
const db = require('../db')

const CartProduct = db.define('cartProduct', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1
    }
  }
})

CartProduct.updateOrCreate = async (originalCartId, newCartId) => {
  const newCartProducts = await CartProduct.findAll({
    where: {cartId: newCartId}
  })
  newCartProducts.forEach(product => {
    CartProduct.destroy({
      where: {productId: product.productId, cartId: originalCartId}
    })
  })
  CartProduct.update({cartId: newCartId}, {where: {cartId: originalCartId}})
}

module.exports = CartProduct
