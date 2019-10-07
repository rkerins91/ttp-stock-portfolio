const express = require('express')
const router = express.Router()
const { Portfolio } = require('../db/models')

router.post('/', async (req, res) => {
  const { tickerName, tradeAmount, userId } = req.body
  try {
    let portfolio = await Portfolio.find({
      where: {
        tickerName, userId
      }
    })
    // if entry exists in db, update it with new amount, else create new entry
    if (portfolio) {
      portfolio = await Portfolio.update({
        where: {
          tickerName, 
          userId
        },
        amountOwned: portfolio.amountOwned + tradeAmount
      })
    } else {
      portfolio = await Portfolio.create({
        tickerName, 
        userId,
        amountOwned: tradeAmount
      })
    }
    await User.update(
      {accountBalance},
      {where: 
        {id: userId}
      }
    )
    // respond with entry
    res.send(portfolio)
  } catch (error) {
    res.send(400)
  }
})

module.exports = router