const jwt = require('jsonwebtoken')

const { JWTSECRET } = require('../secrets')

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token')

  if (!token) {
    return res.status(401).json({ msg: 'Authorization denied'})
  }

  try {
    const decoded = jwt.verify(token, JWTSECRET)
    req.user = decoded.user
    next()
  } catch (error) {
    res.status(401).json({msg: 'Token is not valid'})
  }
}
