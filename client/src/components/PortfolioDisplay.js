import React, { Component } from 'react'
import SinglePortfolioItem from './SinglePortfolioItem';
import { connect } from 'react-redux'
import { getTransactions } from '../store/transactions'
import { getPortfolio } from '../store/portfolio'

class PortfolioDisplay extends Component {
  constructor(props) {
    super()
  }



  render() {
    // const stockValue = this.props.portfolio.reduce((acc, curr) => {
    //   return acc + Number(curr.stockPrice)
    // }, 0)
    // const totalBalance = stockValue + this.props.accountBalance / 100
    return (

      <div id='PortfolioDisplay-container' className={this.props.className}>
        <div className='SinglePortfolioItem-container'>
          <p className="Portfolio-column-label"><strong>TICKER</strong></p>
          <p className="Portfolio-column-label"><strong>OPEN PRICE</strong></p>
          <p className="Portfolio-column-label"><strong>CURRENT PRICE</strong></p>
        </div>
        {this.props.portfolio.map((ele, idx) => <SinglePortfolioItem key={idx} info={ele} />)}
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    transactions: state.user.transactions,
    id: state.user.id,
    token: state.user.token,
    portfolio: state.portfolio.portfolioDisplayProperties,
    accountBalance: state.user.accountBalance
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTransactions: (id, key) => dispatch(getTransactions(id, key)),
    getPortfolio: (transactions) => dispatch(getPortfolio(transactions))
  }
}


PortfolioDisplay = connect(mapStateToProps, mapDispatchToProps)(PortfolioDisplay)

export default PortfolioDisplay