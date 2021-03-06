const express = require('express')
const router = express.Router()
const { Portfolio } = require('../db/models')

router.post('/', async (req, res) => {
  const { tickerName, amount, userId } = req.body
  let update
  try {
    let portfolio = await Portfolio.findAll({
      where: {
        tickerName, userId
      }
    })
    let newAmountOwned
    // if entry exists in db, update it with new amount, else create new entry
    if (portfolio.length >= 1) {
      newAmountOwned = portfolio[0].dataValues.amountOwned + Number(amount)
      update = await Portfolio.update(
        {amountOwned: newAmountOwned },
        {
        where: {
          tickerName, 
          userId
        }}
        
      )
    } else {
      portfolio = await Portfolio.create({
        tickerName, 
        userId,
        amountOwned: amount
      })
      newAmountOwned = amount
    }
    // respond with entry
    res.send({...portfolio, amountOwned: newAmountOwned})
  } catch (error) {
    res.send(400)
  }
})

module.exports = router