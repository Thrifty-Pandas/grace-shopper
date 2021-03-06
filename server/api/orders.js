const {User, Product, Order, OrderProduct, Cart} = require('../db/models')
const router = require('express').Router()

module.exports = router

// shows all the orders for a specific user

router.get('/', async (req, res, next) => {
  try {
    let orders
    if (!req.user) res.sendStatus(404)
    const user = await User.findById(req.user.dataValues.id)
    if (user.isAdmin) {
      orders = await Order.findAll({include: [Product]})
    } else {
      orders = await Order.findAll({
        include: [Product],
        where: {userId: req.user.id}
      })
    }
    res.status(200).json(orders)
  } catch (err) {
    next(err)
  }
})

// shows one specific order for a specific user
router.get('/:orderId', async (req, res, next) => {
  try {
    let singleOrder
    const user = await User.findById(req.user.dataValues.id)
    const order = await Order.findById(req.params.orderId)
    if (user.isAdmin || order.userId === user.id) {
      singleOrder = await Order.findOne({
        where: {
          id: req.params.orderId
        },
        include: {
          model: Product
        }
      })
    }
    res.status(200).json(singleOrder)
  } catch (err) {
    next(err)
  }
})

// when admin wants to update the status of a specific order
router.put('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId)
    if (req.user.dataValues.isAdmin) {
      if (req.body.status && req.body.status !== order.status) {
        const updatedOrder = await order.update({status: req.body.status})
        res.status(204).json(updatedOrder)
      }
    }
  } catch (err) {
    next(err)
  }
})

// add new order to a specific user
router.post('/', async (req, res, next) => {
  const {
    shippingAddress,
    email,
    totalPrice,
    temporaryUserId,
    userId,
    status,
    cartId
  } = req.body
  const orderInfo = {
    shippingAddress,
    email,
    totalPrice,
    temporaryUserId,
    userId,
    status
  }

  try {
    const cart = await Cart.findById(cartId)
    const order = await cart.createOrder({orderInfo})
    res.status(201).json(order)
  } catch (err) {
    next(err)
  }
})
