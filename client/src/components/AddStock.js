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
    
    const { ticker, amount, id, accountBalance} = this.props.user 
    this.props.postTransaction(ticker, amount, id, accountBalance)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
    this.props.changeState(this.state)
  }

  render() {
    return (
      <div style={{marginLeft:'100px', marginTop:'300px'}}>
        <form onSubmit={this.handleSubmit}>
          <input name='ticker' type='text' value={this.state.ticker} onChange={this.handleChange} />
          <div>
            <p>amount</p>
            <input name='amount' type='number' value={this.state.amount} min='1' max='20' onChange={this.handleChange} />
            <button type='submit' >Submit </button>
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


