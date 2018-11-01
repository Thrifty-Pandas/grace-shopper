const router = require('express').Router()
const {User, Cart, Product, CartProduct} = require('../db/models')

router.post('/:productId', async (req, res, next) => {
  try {
    let cart
    let existingUser

    // Check if user is authenticated or guest:
    if (req.session.userId) {
      existingUser = await User.findById(req.session.userId) // assumes that authenticated user info will be persisted using req.session.userId, adjust and verify when user authentication is completed
    }

    // Create or find existing cart on Cart model:
    if (!existingUser) {
      cart = Cart.findOrCreate({
        where: {
          temporaryUserId: req.session.id // TODO: needs to be encrypted to uuid but using it directly for now
        }
      })
    } else {
      cart = await Cart.findOrCreate({where: {userId: existingUser.id}})
    }

    // Find product:
    const product = await Product.findById(req.params.id)

    // Take cart and product and create instance on CartProduct with foreign keys referring to Cart model and Product model
    const newProductInCart = await CartProduct.create({
      CartId: cart.id,
      ProductId: product.id,
      quantity: req.body.quantity
    })
    res.status(201).json(newProductInCart)
  } catch (err) {
    next(err)
  }
})

module.exports = router
