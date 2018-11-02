const router = require('express').Router()
const {User, Cart, Product, CartProduct} = require('../db/models')

async function findCart(sessionInfo) {
  let existingUser = {}
  if (sessionInfo.user) {
    existingUser = await User.findById(sessionInfo.userId)
  }
  let cart = {}
  if (!existingUser.id) {
    const cartinstance = await Cart.findOrCreate({
      where: {
        temporaryUserId: sessionInfo.id
      }
    })
    sessionInfo.temporaryUserId = sessionInfo.temporaryUserId
      ? sessionInfo.temporaryUserId
      : sessionInfo.id
    cart = cartinstance[0]
  } else {
    const cartinstance = await Cart.findOrCreate({
      where: {userId: existingUser.id}
    })
    cart = cartinstance[0]
  }
  return cart
}

router.post('/:productId', async (req, res, next) => {
  try {
    const cart = await findCart(req.session)
    const product = await Product.findById(req.params.productId)
    const newProductInCart = await CartProduct.create({
      cartId: cart.id,
      productId: product.id,
      quantity: req.body.quantity ? req.body.quantity : 1
    })
    res.status(201).json(newProductInCart)
  } catch (err) {
    next(err)
  }
})

router.put('/:productId', async (req, res, next) => {
  try {
    const cart = await findCart(req.session)
    const product = await Product.findById(req.params.productId)
    const currentProductInCart = await CartProduct.find({
      where: {
        cartId: cart.id,
        productId: product.id
      }
    })
    const updatedProduct = await currentProductInCart.update({
      quantity:
        currentProductInCart.quantity +
        (req.body.quantity ? req.body.quantity : 1)
    })
    res.status(204).json(updatedProduct)
  } catch (err) {
    next(err)
  }
})

module.exports = router
