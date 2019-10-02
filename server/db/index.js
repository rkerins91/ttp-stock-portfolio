const Sequelize = require('sequelize')
const User = require('./models/Users')
const Transaction = require('./models/Transactions')

User.hasMany(Transaction)
Transaction.belongsTo(User)

const db = new Sequelize('postgres://localhost:5432/stocks', {
    logging: false
})

module.exports = { db, User, Transaction}