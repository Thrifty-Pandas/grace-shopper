const {Order, OrderProduct} = require('../db/models')
const router = require('express').Router()

module.exports = router

async function findOrders(sessionInfo) {
  // if (sessionInfo.temporaryUserId) {
  //   const orders = await Order.findAll({
  //     where: {
  //       temporaryUserId: sessionInfo.temporaryUserId
  //     }
  //   })
  //   return orders
  // } else {
  const orders = await Order.findAll({
    where: {
      userId: sessionInfo.passport.user
    },
    include: [
      {
        all: true
        //as: 'Instruments'
      }
    ]
  })
  return orders
}
// }

// shows all the orders for a specific user
router.get('/', async (req, res, next) => {
  try {
    const orders = await findOrders(req.session)
    res.status(200).json(orders)
  } catch (err) {
    next(err)
  }
})

// shows one specific order for a specific user
router.get('/:orderId', async (req, res, next) => {
  try {
    const productsInOrder = await OrderProduct.findAll({
      where: {
        orderId: req.params.id
      }
    })
    res.status(200).json(productsInOrder)
  } catch (err) {
    next(err)
  }
})

// add new order to a specific user
router.post('/', async (req, res, next) => {
  const {
    shippingAddress,
    email,
    price,
    temporaryUserId,
    userId,
    status
  } = req.body
  try {
    const order = await Order.create({
      shippingAddress,
      email,
      price,
      temporaryUserId,
      userId,
      status
    })
    res.status(201).json(order)
  } catch (err) {
    next(err)
  }
})
