const {Product, ProductCategory, Review, Category} = require('../db/models')
const router = require('express').Router()
const Op = require('sequelize').Op
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: [Category],
      where: {stock: {[Op.gt]: 0}}
    })
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.eagerLoadCategoriesReviews(
      Number(req.params.productId)
    )

    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  //TODO add in security checks using req.user
  const {
    name,
    description,
    stock,
    price,
    productCategories,
    imageUrl
  } = req.body
  try {
    const product = await Product.create({
      name,
      description,
      stock,
      price,
      imageUrl
    })

    await product.setCategories(productCategories)
    const newProduct = await Product.findById(product.id, {
      include: [Category]
    })
    res.json(newProduct)
  } catch (err) {
    next(err)
  }
})

router.put('/:productId', async (req, res, next) => {
  try {
    const {name, description, stock, price, productCategories} = req.body
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
