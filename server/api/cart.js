const router = require('express').Router()
const {User, Cart, Product, CartProduct} = require('../db/models')

async function findCart(req) {
  let cart = {}
  const existingUser = req.user && (await User.findById(req.user.id))
  const cartinstance = await Cart.findOrCreate({
    where: {
      temporaryUserId: req.session.id
    }
  })
  req.session.temporaryUserId = req.session.temporaryUserId
    ? req.session.temporaryUserId
    : req.session.id
  cart = cartinstance[0]
  if (existingUser) {
    const originalCart = await Cart.find({
      where: {userId: existingUser.id}
    })
    const currentProductsInCart = await CartProduct.findAll({
      where: {cartId: cart.id}
    })
    if (originalCart) {
      if (currentProductsInCart) {
        await CartProduct.updateOrCreate(originalCart.id, cart.id)
        await cart.update({userId: existingUser.id})
        await originalCart.destroy()
      } else {
        await cart.destroy()
        cart = originalCart
      }
    }
  }

  return cart
}

router.get('/', async (req, res, next) => {
  try {
    const cart = await findCart(req)
    const productsInCart = await CartProduct.findAll({
      where: {
        cartId: cart.id
      }
    })
    res.status(200).json(productsInCart)
  } catch (err) {
    next(err)
  }
})

router.get('/current', async (req, res, next) => {
  try {
    const cart = await findCart(req)
    const productsInCart = await Product.findAll({
      include: [
        {
          model: Cart,
          where: {id: cart.id}
        }
      ]
    })
    res.status(200).json(productsInCart)
  } catch (err) {
    next(err)
  }
})

router.post('/:productId', async (req, res, next) => {
  try {
    const cart = await findCart(req)
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
    const cart = await findCart(req)
    const product = await Product.findById(req.params.productId)
    const currentProductInCart = await CartProduct.find({
      where: {
        cartId: cart.id,
        productId: product.id
      }
    })
    const updatedProduct = req.body.quantity
      ? await currentProductInCart.update({quantity: req.body.quantity})
      : await currentProductInCart.increment({quantity: 1})
    // const updatedProduct = await currentProductInCart.increment({
    //   quantity: req.body.quantity ? req.body.quantity : 1
    // })
    res.status(204).json(updatedProduct)
  } catch (err) {
    next(err)
  }
})

router.delete('/:productId', async (req, res, next) => {
  try {
    const cart = await findCart(req)
    await CartProduct.destroy({
      where: {
        cartId: cart.id,
        productId: req.params.productId
      }
    })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

module.exports = router
