import React, { Component } from 'react'
import SinglePortfolioItem from './SinglePortfolioItem';
import { connect } from 'react-redux'
import { getTransactions, getPortfolio } from '../store/user'

class PortfolioDisplay extends Component {
  constructor(props) {
    super()
  }



  render() {
    const stockValue = this.props.portfolio.reduce((acc, curr) => {
      return acc + Number(curr.stockPrice)
    }, 0)
    console.log(this.props.accountBalance)
    const totalBalance = stockValue + this.props.accountBalance / 100
    console.log(totalBalance)
    return (

      <div id='PortfolioDisplay-container' className={this.props.className}>
        <div className='SinglePortfolioItem-container'>
          <p className="Portfolio-column-label"><strong>TICKER</strong></p>
          <p className="Portfolio-column-label"><strong>OPEN PRICE</strong></p>
          <p className="Portfolio-column-label"><strong>CURRENT PRICE</strong></p>
          <p className="Portfolio-column-label"><strong>CHANGE</strong></p>
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
    authKey: state.user.token,
    portfolio: state.user.portfolio,
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