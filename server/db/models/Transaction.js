const Sequelize = require('sequelize')
const db = require('../db')

const Transaction = db.define('transaction', {
  tickerName: {
    type: Sequelize.STRING
  },
  tradePrice: {
    type: Sequelize.INTEGER
  },
  tradeAmount: {
    type: Sequelize.INTEGER
  },
  type: {
    type: Sequelize.STRING,
    validate: {
      isIn: [['buy', 'sell']]
    }
  }
})

module.exports = Transaction

