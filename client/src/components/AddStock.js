import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeState, postTransaction } from '../store/user'


class AddStock extends Component {
  constructor (props) {
    super()
    this.state = {
      ticker: '',
      amount: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.changeState(this.state)

    
    const { ticker, amount, id, accountBalance} = this.props.user 
    console.log(amount)
    this.props.postTransaction(ticker, amount, id, accountBalance)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log('state', this.state)
    this.props.changeState(this.state)
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
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeState: (change) => dispatch(changeState(change)),
    postTransaction: (ticker, amount, id, accountBalance) => dispatch(postTransaction(ticker, amount, id, accountBalance))
  }
}


AddStock = connect(mapStateToProps, mapDispatchToProps)(AddStock)

export default AddStock


