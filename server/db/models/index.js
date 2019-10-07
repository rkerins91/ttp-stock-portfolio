const Sequelize = require('sequelize')
const User = require('./User')
const Transaction = require('./Transaction')
const Portfolio = require('./Portfolio')

User.hasMany(Transaction)
Transaction.belongsTo(User)

User.hasMany(Portfolio)
Portfolio.belongsTo(User)

module.exports = { User, Transaction, Portfolio }
