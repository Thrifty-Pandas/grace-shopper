const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/products', require('./products'))
router.use('/categories', require('./categories'))
<<<<<<< HEAD
router.use('/orders', require('./orders'))
=======
router.use('/cart', require('./cart'))
>>>>>>> a90da65f8263a5e985cacbe8685d3b0329b14dd9

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
