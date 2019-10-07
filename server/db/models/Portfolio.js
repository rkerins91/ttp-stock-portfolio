const Sequelize = require('sequelize')
const db = require('../db')

const Portfolio = db.define('transaction', {
  tickerName: {
    type: Sequelize.STRING
  },
  amountOwned: {
    type: Sequelize.INTEGER
  }
})

module.exports = Portfolio