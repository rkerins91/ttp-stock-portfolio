const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
const User = require('../db/models/User')
const { JWTSECRET } = require('../../secrets')

router.get('/', (req, res) => {
  res.send('user route')
})

router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password of at least 8 characters').isLength({ min: 8 })
], async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }

  const { name, email, password } = req.body

  const salt = await bcrypt.genSalt(10)
  const securePassword = await bcrypt.hash(password, salt)

  try {
    const user = await User.create({name, email, password: securePassword})
    const payload = {
      user: {
        id: user.id
      }
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

router.get('/:id/portfolio', auth, async (req, res) => {
  try {
    const id = req.body.id
    const user = await User.findOne({
      where: {id}
    })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
