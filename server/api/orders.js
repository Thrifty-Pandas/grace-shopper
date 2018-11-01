const {Order} = require('../db/models')
const router = require('express').Router()
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findById(Number(req.params.orderId))
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  const {shippingAddress, email, price, temporaryUserId, status} = req.body
  try {
    const order = await Order.create({
      shippingAddress,
      email,
      price,
      temporaryUserId,
      status
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})
