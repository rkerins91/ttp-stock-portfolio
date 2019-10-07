const express = require('express')
const router = express.Router()
const { Portfolio } = require('../db/models')

router.post('/', async (req, res) => {
  const { tickerName, amount, userId } = req.body
  console.log(req.body)
  try {
    console.log('in port try')
    let portfolio = await Portfolio.findAll({
      where: {
        tickerName, userId
      }
    })
    console.log('portfolio', portfolio == false)
    // if entry exists in db, update it with new amount, else create new entry
    if (portfolio.length >= 1) {
      console.log('inif')
      portfolio = await Portfolio.update({
        where: {
          tickerName, 
          userId
        },
        amountOwned: portfolio.amountOwned + amount
      })
    } else {
      console.log('in else')
      portfolio = await Portfolio.create({
        tickerName, 
        userId,
        amountOwned: amount
      })
    }
    // respond with entry
    res.send(portfolio)
  } catch (error) {
    res.send(400)
  }
})

module.exports = router