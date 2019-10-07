const express = require('express')
const router = express.Router()
const { User, Transaction } = require('../db/models')

// Create transaction
router.post('/', async (req, res) => {
  const { tickerName, tradePrice, tradeAmount, userId, accountBalance } = req.body

  try {
    const transaction = await Transaction.create({tickerName, tradePrice, tradeAmount, userId})
    await User.update(
      {accountBalance},
      {where: 
        {id: userId}
      }
    )
    res.send(transaction)
  } catch (error) {
    res.send(400)
  }
})

module.exports = router
