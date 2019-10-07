import React, { Component } from 'react'
import AddStock from './AddStock'
import PortfolioDisplay from './PortfolioDisplay'
import { connect } from 'react-redux'
// import { getTransactions, getPortfolio } from '../store/user'
import './styles/Portfolio.css'

class Portfolio extends Component {
  constructor(props) {
    super()
  }

  async componentDidMount() {
    // const {id, token} = this.props 
    // await this.props.getTransactions(id, token)
    // const { transactions } = this.props
    // this.props.getPortfolio(transactions)
  }

  render() {
    return (
      <div id='Portfolio-container'>
        <PortfolioDisplay className='Portfolio-element' balance={this.props.accountBalance}/>
        <AddStock className='Portfolio-element' />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    id: state.user.id,
    token: state.user.token,
    accountBalance: state.user.accountBalance,
    user: state.user,
    transactions: state.transactions.transactions,
    portfolio: state.portfolio.portfolio
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

Portfolio = connect(mapStateToProps, mapDispatchToProps)(Portfolio)

export default Portfolio
