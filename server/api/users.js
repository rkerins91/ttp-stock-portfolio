const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const User = require('../db/models/User')

router.get('/', (req, res) => {
  res.send('user route')
})

router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password of at least 8 characters').isLength({ min: 8 })
], async (req, res, next) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }

  const { name, email, password } = req.body

  try {
    const user = await User.create(req.body)
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(error)
    }
  }

})
module.exports = router