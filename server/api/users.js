const router = require('express').Router()
const {User} = require('../db/models')
const userFormErrorHandler = require('../../script/errors')
const permit = require('../permit')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
router.post('/', async (req, res, next) => {
  console.log(req.body)
  try {
    const newUser = await User.create(req.body)
    res.status(201).json(newUser)
  } catch (err) {
    userFormErrorHandler(res, err)
    next(err)
  }
})
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
    res.json(user)
  } catch (err) {
    next(err)
  }
})
router.delete('/:userId', permit('Admin'), async (req, res, next) => {
  console.log(req.body)
  try {
    const deletedUser = await User.destroy({
      where: {
        id: req.params.userId
      }
    })
    res.json(deletedUser)
  } catch (err) {
    console.error(err)
  }
})

router.put('/:userId', permit('Admin'), async (req, res, next) => {
  console.log(req.body)
  try {
    const adminUser = await User.update(
      {isAdmin: true},
      {
        where: {
          id: req.params.userId
        }
      }
    )
    res.json(adminUser)
  } catch (err) {
    console.error(err)
  }
})
