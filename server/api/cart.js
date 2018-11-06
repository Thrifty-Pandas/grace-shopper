const router = require('express').Router()
const {User, Cart, Product, CartProduct} = require('../db/models')

async function findCart(req) {
  let existingUser = {}
  if (req.user) {
    console.log('req.user.dataValues.id: ', req.user.dataValues.id)
    // if there is an authenticated user logged in, load that user and assign it to existingUser
    existingUser = await User.findById(req.user.id)
  }
  let cart = {}
  if (!existingUser.id) {
    // if there is no authenticated user , create or find a cart for the guest
    const cartinstance = await Cart.findOrCreate({
      where: {
        temporaryUserId: req.session.id
      }
    })
    req.session.temporaryUserId = req.session.temporaryUserId
      ? req.session.temporaryUserId
      : req.session.id
    cart = cartinstance[0]
  } else {
    // if there is an authenticated user, find a cart for the current session Id and update it with userId, or else find or create a new cart with just userId
    const unAuthedCart = await Cart.find({
      where: {
        temporaryUserId: req.session.id
      }
    })
    if (unAuthedCart) {
      const originalCart = await Cart.findOne({
        where: {userId: existingUser.id}
      })
      const originalProducts = await CartProduct.findAll({
        where: {cartId: originalCart.id}
      })
      await unAuthedCart.update({
        userId: req.user.dataValues.id
      })
      const newProducts = await CartProduct.findAll({
        where: {cartId: unAuthedCart.id}
      })
      originalProducts.forEach(async orgproduct => {
        if (
          newProducts.filter(
            product => product.productId !== orgproduct.productId
          ).length
        ) {
          console.log('the if statement passed')
          console.log('unauthed cart id: ', unAuthedCart.id)
          console.log('orgproduct', orgproduct)
          const neworgproduct = await orgproduct.update({
            cartId: unAuthedCart.id
          })
          console.log('orgproduct after', neworgproduct)
        }
      })
      // if (originalCart) {
      //   await CartProduct.update(
      //     {cartId: unAuthedCart.id},
      //     {where: {cartId: originalCart.id}}
      //   )}

      cart = unAuthedCart
    } else {
      const cartinstance = await Cart.findOrCreate({
        where: {userId: existingUser.id}
      })
      cart = cartinstance[0]
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
    console.log('updatedProduct', updatedProduct)
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
