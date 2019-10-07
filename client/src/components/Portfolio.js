import React, { Component } from 'react'
import AddStock from './AddStock'
import PortfolioDisplay from './PortfolioDisplay'
import { connect } from 'react-redux'
import { getTransactions, getPortfolio } from '../store/user'
import './Portfolio.css'

class Portfolio extends Component {
  constructor(props) {
    super()

  }

  async componentDidMount() {
    console.log('PDIDMOUNT')
    const {id, authKey} = this.props 
    await this.props.getTransactions(id, authKey)
    const { transactions } = this.props
    this.props.getPortfolio(transactions)
  }

  render() {
    return (
      <div id='Portfolio-container'>
        <PortfolioDisplay className='Portfolio-element' portfolio={this.props.portfolio} balance={this.props.accountBalance}/>
        <AddStock className='Portfolio-element' />
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

Portfolio = connect(mapStateToProps, mapDispatchToProps)(Portfolio)

export default Portfolio
