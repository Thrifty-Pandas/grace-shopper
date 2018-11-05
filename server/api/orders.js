const router = require('express').Router()
const {Order} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          all: true
        }
      ]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})
router.get('/:userId', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {userId: req.params.userId},
      include: [
        {
          all: true
        }
      ]
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})
