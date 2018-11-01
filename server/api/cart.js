const router = require('express').Router()
const {User, Cart, Product, CartProduct} = require('../db/models')

router.post('/:productId', async (req, res, next) => {
  try {
    let existingUser = {}

    // Check if user is authenticated or guest:
    if (req.session.userId) {
      existingUser = await User.findById(req.session.userId) // assumes that authenticated user info will be persisted using req.session.userId, adjust and verify when user authentication is completed
    }
    let cart = {}
    // Create or find existing cart on Cart model:
    if (!existingUser) {
      const cartinstance = Cart.findOrCreate({
        where: {
          temporaryUserId: req.session.id // TODO: needs to be encrypted to uuid but using it directly for now
        }
      })
      cart = cartinstance[0]
    } else {
      const cartinstance = await Cart.findOrCreate({
        where: {userId: existingUser.id}
      })
      cart = cartinstance[0]
    }

    // Find product:
    const product = await Product.findById(req.params.productId)

    // Take cart and product and create instance on CartProduct with foreign keys referring to Cart model and Product model
    const newProductInCart = await CartProduct.create({
      cartId: cart.id,
      productId: product.id,
      quantity: req.body.quantity
    })
    res.status(201).json(newProductInCart)
  } catch (err) {
    next(err)
  }
})

module.exports = router
