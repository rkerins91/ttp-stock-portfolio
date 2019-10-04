import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTransactions} from '../store/user'
import SingleTransaction from './SingleTransaction';

class TransactionsList extends Component {
  constructor(props) {
    super()
  }

  componentDidMount() {
    this.props.getTransactions(this.props.id, this.props.authKey)
  }
  render() {
    console.log('protrans', this.props.transactions[0])
    return (

      <div>
        {this.props.transactions.map((ele, idx) => <SingleTransaction key={idx} transaction={ele}/>)}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    transactions: state.user.transactions,
    id: state.user.id,
    authKey: state.user.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTransactions: (id, key) => dispatch(getTransactions(id, key))
  }
}

TransactionsList = connect(mapStateToProps, mapDispatchToProps)(TransactionsList)

export default TransactionsList

