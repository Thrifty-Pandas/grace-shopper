const router = require('express').Router()
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const {token} = req.body
    let {status} = await stripe.charges.create({
      amount: 2000,
      currency: 'usd',
      description: 'An example charge',
      source: token.id
    })

    res.json({status})
  } catch (err) {
    next(err)
  }
})
