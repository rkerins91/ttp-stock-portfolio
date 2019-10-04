import React from 'react'

const SingleTransaction = (props) => {
  console.log('single',props)
  return (
    <div>
      <p>{props.transaction.tickerName}</p>
      <p>{props.transaction.tradePrice}</p>
      <p>{props.transaction.tradeAmount}</p>
    </div>
  )
}

export default SingleTransaction
