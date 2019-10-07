import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUpdatedBalance } from '../store/user'
import { postTransaction } from '../store/transactions'
import { addPortfolioEntry } from '../store/portfolio'


class AddStock extends Component {
  constructor(props) {
    super()
    this.state = {
      ticker: '',
      amount: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    const { id, accountBalance, token } = this.props.user

    await this.props.postTransaction(this.state.ticker, this.state.amount, id, accountBalance, token)

    if (accountBalance - this.state.amount * this.props.transactions.tradePrice >= 0) {
      this.props.addPortfolioEntry(this.state.ticker, this.state.amount, id)
      this.props.updateBalance(id)
    }
  }

  render() {
    return (
      <div className={this.props.className}>
        <form onSubmit={this.handleSubmit}>
          <p>Cash: {this.props.user.accountBalance / 100}</p>
          <input name='ticker' className='Form-text-input' type='text' value={this.state.ticker} onChange={this.handleChange} />
          <div>
            <p>Amount</p>
            <input name='amount' className='Form-text-input' type='number' value={this.state.amount} min='1' max='20' onChange={this.handleChange} />
            <button type='submit' className='Form-submit'>Submit </button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    transactions: state.transactions
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateBalance: (id) => dispatch(getUpdatedBalance(id)),
    postTransaction: (ticker, amount, id, accountBalance, token) => dispatch(postTransaction(ticker, amount, id, accountBalance, token)),
    addPortfolioEntry: (tickerName, amount, id, accountBalance) => dispatch(addPortfolioEntry(tickerName, amount, id, accountBalance))
  }
}


AddStock = connect(mapStateToProps, mapDispatchToProps)(AddStock)

export default AddStock


