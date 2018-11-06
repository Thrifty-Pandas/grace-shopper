const {Category} = require('../db/models')
const router = require('express').Router()

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll()
    res.json(categories)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {name} = req.body
    const category = await Category.create({name})
    res.json(category)
  } catch (err) {
    next(err)
  }
})
