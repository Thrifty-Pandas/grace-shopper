const {Review} = require('../db/models')
const router = require('express').Router()

router.post('/', async (req, res, next) => {
  const {text, stars, userId} = req.body
  try {
    const review = await Review.create({text, stars, userId})
    res.json(review)
  } catch (err) {
    next(err)
  }
})
