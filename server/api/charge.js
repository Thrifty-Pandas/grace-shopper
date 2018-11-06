const router = require('express').Router()
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc')
module.exports = router

router.post('/charge', async (req, res, next) => {
  try {
    let {status} = await stripe.charges.create({
      amount: 2000,
      currency: 'usd',
      description: 'An example charge',
      source: req.body
    })

    res.json({status})
  } catch (err) {
    next(err)
  }
})
