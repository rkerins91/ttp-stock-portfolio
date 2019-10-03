const Sequelize = require('sequelize')
const db = require('../db')
const bcrypt = require('bcrypt')

const User = db.define('user', {
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  accountBalance: {
    type: Sequelize.INTEGER,
    defaultValue: 500000
  }
})

module.exports = User
