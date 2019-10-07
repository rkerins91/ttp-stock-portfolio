const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
const { User, Transaction, Portfolio } = require('../db/models')
const { JWTSECRET } = require('../../secrets')

router.get('/', (req, res) => {
  res.send('user route')
})

// Create User and give JSON Web Token
router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password of at least 8 characters').isLength({ min: 8 })
], async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { name, email, password } = req.body

  // create encrypted password
  const salt = await bcrypt.genSalt(10)
  const securePassword = await bcrypt.hash(password, salt)

  try {
    const user = await User.create({ name, email, password: securePassword })
    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(
      payload,
      JWTSECRET,
      { expiresIn: 3600 },
      (error, token) => {
        const userRes = user.dataValues
        delete userRes.password
        if (error) throw error
        res.json({ ...userRes, token })
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

router.get('/:id/transactions', auth, async (req, res) => {
  try {

    const id = req.params.id
    const isAuth = Number(id) === req.user.id
    if (isAuth) {
      const user = await User.findOne({
        where: { id },
        include: [{ model: Transaction }]
      })
      res.send(user)
    } else {
      res.send(404)
    }
  } catch (error) {
    console.log(error)
  }
})

router.get('/:id/portfolio', auth, async (req, res) => {
  try {
    const id = req.params.id
    const isAuth = Number(id) === req.user.id
    if (isAuth) {
      const user = await User.findOne({
        where: { id },
        include: [{ model: Portfolio }]
      })
      res.send(user)
    } else {
      res.send(404)
    }
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
