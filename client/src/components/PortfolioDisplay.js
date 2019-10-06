import React from 'react'
import SinglePortfolioItem from './SinglePortfolioItem';

const PortfolioDisplay = (props) => {
  const stockValue = props.portfolio.reduce((acc, curr) => {
    console.log('curr', curr)
    console.log(Number(curr.stockPrice))
    return acc + Number(curr.stockPrice)}, 0)
  console.log(props.balance)
  const totalBalance = stockValue + props.balance / 100
  console.log(totalBalance)
  return (
    <div id='PortfolioDisplay-container' className={props.className}>
      <div className='SinglePortfolioItem-container'>
        <p className="Portfolio-column-label"><strong>TICKER</strong></p>
        <p className="Portfolio-column-label"><strong>OPEN PRICE</strong></p>
        <p className="Portfolio-column-label"><strong>CURRENT PRICE</strong></p>
        <p className="Portfolio-column-label"><strong>CHANGE</strong></p>
      </div>
      {props.portfolio.map((ele, idx) => <SinglePortfolioItem key={idx} info={ele}/>)}
    </div>
  )
}

export default PortfolioDisplay
