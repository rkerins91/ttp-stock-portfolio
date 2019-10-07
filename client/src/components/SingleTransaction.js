import React from 'react'

const SingleTransaction = (props) => {
  return (
    <div className='SingleTransaction-container'>
      <p className='SingleTransaction-item'>{props.transaction.tickerName}</p>
      <p className='SingleTransaction-item'>${props.transaction.tradePrice / 100}</p>
      <p className='SingleTransaction-item'>{props.transaction.tradeAmount}</p>
    </div>
  )
}

export default SingleTransaction
