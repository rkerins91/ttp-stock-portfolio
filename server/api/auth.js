const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')
const User = require('../db/models/User')
const { JWTSECRET } = require('../../secrets')
const { check, validationResult } = require('express-validator')


router.get('/', auth, async (req, res) => {
  try {
    const {id, name, email, accountBalance} = await User.findByPk(req.user.id)
    res.json({id, name, email, accountBalance})
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
})

router.post('/', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
], async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }

  const { email, password } = req.body

  try {
    const user = await User.findOne({ where: { email }})

    if (!user) {
      res.status(400).json({errors: [{msg: 'Invalid credentials'}]})
    }

    const payload = {
      user: {
        id: user.id
      }
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      res.status(400).json({errors: [{msg: 'Invalid credentials'}]})
    }

    jwt.sign(
      payload,
      JWTSECRET,
      { expiresIn: 360000 },
      (error, token) => {
        if (error) throw error
        res.json({ token })
      }
    )
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(error)
    }
  }

})

module.exports = router

