import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTransactions} from '../store/transactions'
import SingleTransaction from './SingleTransaction';
import './styles/Transaction.css'

class TransactionsList extends Component {
  constructor(props) {
    super()
  }

  render() {
    return (

      <div id='Transaction-container'>
        <div className='SingleTransaction-container'>
        <p className='SingleTransaction-item'><strong>Ticker Name</strong></p>
        <p className='SingleTransaction-item'><strong>Price at Time of Purchase</strong></p>
        <p className='SingleTransaction-item'><strong>Amount Purchased</strong></p>
      </div>
        {this.props.transactions.map((ele, idx) => {
        return  <SingleTransaction key={idx} transaction={ele}/>}
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    transactions: state.transactions.transactions,
    id: state.user.id,
    token: state.user.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTransactions: (id, key) => dispatch(getTransactions(id, key))
  }
}

TransactionsList = connect(mapStateToProps, mapDispatchToProps)(TransactionsList)

export default TransactionsList

