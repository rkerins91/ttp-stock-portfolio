const express = require('express')
const router = express.Router()
const { Transaction } = require('../db/models')

router.post('/', async (req, res) => {

  const { tickerName, tradePrice, tradeAmount, userId } = req.body
  console.log(req.body)

  try {
    const transaction = await Transaction.create({tickerName, tradePrice, tradeAmount, userId})
    res.send(transaction)
  } catch (error) {
    res.send(400)
  }

})

module.exports = router
