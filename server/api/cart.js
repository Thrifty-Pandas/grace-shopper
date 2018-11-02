const router = require('express').Router()
const {User, Cart, Product, CartProduct} = require('../db/models')

async function findCart(sessionInfo) {
  let existingUser = {}
  // Check if user is authenticated or guest:
  if (sessionInfo.user) {
    console.log('hi', sessionInfo.user.id)
    existingUser = await User.findById(sessionInfo.userId) // assumes that authenticated user info will be persisted using req.session.userId, adjust and verify when user authentication is completed
  }
  let cart = {}
  // Create or find existing cart on Cart model:
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
    console.log('existing user')
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
    console.log(cart)
    // Find product
    const product = await Product.findById(req.params.productId)
    console.log('cart id: ', cart.id)
    console.log('product id: ', product.id)
    console.log('quantity: ', req.body.quantity)
    // Take cart and product and create instance on CartProduct with foreign keys referring to Cart model and Product model
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

module.exports = router
