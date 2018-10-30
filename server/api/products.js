const {Product} = require('../db/models/product')
const router = require('express').Router()

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findById(Number(req.params.productId))
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  const {name, description, stock, price} = req.body
  try {
    const product = await Product.create({name, description, stock, price})
    res.json(product)
  } catch (err) {
    next(err)
  }
})
