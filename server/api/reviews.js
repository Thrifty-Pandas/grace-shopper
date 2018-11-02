const {Review} = require('../db/models')
const router = require('express').Router()
module.exports = router
router.post('/', async (req, res, next) => {
  const {title, text, stars, userId, productId} = req.body
  try {
    const review = await Review.create({title, text, stars, userId, productId})
    res.json(review)
  } catch (err) {
    next(err)
  }
})
