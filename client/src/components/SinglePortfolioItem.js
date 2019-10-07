import React from 'react'
import './styles/Portfolio.css'

const SinglePortfolioItem = (props) => {
  const { stockName, stockOpen, stockPrice, stockChange } = props.info
  const color = function(stockOpen, stockPrice) {
    if (Number(stockOpen) - Number(stockPrice) > 0) return 'red'
    if (Number(stockOpen) - Number(stockPrice) < 0) return 'green'
    if (Number(stockOpen) - Number(stockPrice) === 0) return 'gray'
  } (stockOpen, stockPrice)
  return (
    <div className='SinglePortfolioItem-container'>
      <p className={`SinglePortfolioItem-${color} SinglePortfolioItem`}>{stockName}</p>
      <p className={`SinglePortfolioItem`}>{stockOpen}</p>
      <p className={`SinglePortfolioItem-${color} SinglePortfolioItem`}>{stockPrice}</p>
    </div>
  )
}

export default SinglePortfolioItem
