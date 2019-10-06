import React from 'react'
import './Portfolio.css'

const SinglePortfolioItem = (props) => {
  const { stockName, stockOpen, stockPrice, stockChange } = props.info
  const color = function(stockOpen, stockPrice) {
    if (stockOpen - stockPrice > 0) return 'red'
    if (stockOpen - stockPrice < 0) return 'green'
    if (stockOpen - stockPrice === 0) return 'gray'
  } (stockOpen, stockPrice)
  return (
    <div className='SinglePortfolioItem-container'>
      <p className={`SinglePortfolioItem-${color} SinglePortfolioItem`}>{stockName}</p>
      <p className={`SinglePortfolioItem`}>{stockOpen}</p>
      <p className={`SinglePortfolioItem-${color} SinglePortfolioItem`}>{stockPrice}</p>
      <p className={`SinglePortfolioItem-${color} SinglePortfolioItem`}>{stockChange}</p>
    </div>
  )
}

export default SinglePortfolioItem
