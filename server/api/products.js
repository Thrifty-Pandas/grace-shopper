const {Product, ProductCategory} = require('../db/models')
const router = require('express').Router()
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          all: true
          //as: 'Instruments'
        }
      ]
    })
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
  //TODO add in security checks using req.user
  const {name, description, stock, price} = req.body
  try {
    const product = await Product.create({name, description, stock, price})
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.put('/:productId', async (req, res, next) => {
  try {
    const {name, description, stock, price} = req.body
    const [numberOfAffectedRows, affectedRows] = await Product.update(
      {
        name,
        description,
        stock,
        price
      },
      {
        where: {id: req.params.productId},
        returning: true,
        plain: true
      }
    )
    res.json(affectedRows)
  } catch (err) {
    next(err)
  }
})
