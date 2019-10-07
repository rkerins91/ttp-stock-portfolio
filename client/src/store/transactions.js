import axios from 'axios'


const initialState = {
  transactions: [],
}

// Assign action types to labels
const GET_TRANSACTIONS = 'GET_TRANSACTIONS'
const ADD_TRANSACTION = 'ADD_TRANSACTION'

// Action creators
const gotTransactions = transactions => ({type: GET_TRANSACTIONS, transactions})
const addTransaction = transaction => ({type: ADD_TRANSACTION, transaction})

// Thunks
export const getTransactions = (userId, token) => async dispatch => {
  try {
    const { data } = await axios.get(`http://localhost:8080/api/users/${userId}/transactions`,
      {
        headers: { 'x-form-token': token }
      }
    )
    dispatch(gotTransactions(data.transactions))
  } catch (authError) {
    return dispatch(gotTransactions({ error: authError }))
  }
}

export const postTransaction = (symbol, amount, id, userBalance, authKey) => async dispatch => {
  let res
  let transaction
  try {
    res = await axios.get('https://www.alphavantage.co/query?',
      {
        params:
        {
          function: 'GLOBAL_QUOTE',
          symbol,
          apikey: authKey
        }
      }
    )
    const data = res.data['Global Quote']
    if (res.data["Error Message"]) {
      alert('invalid ticker')
    }
    const price = Math.round(Number(data['05. price']) * 100)
    const newUserBalance = userBalance - price * amount
    transaction = await axios.post('http://localhost:8080/api/transactions',
      {
        tickerName: symbol,
        tradePrice: price,
        tradeAmount: amount,
        userId: id,
        accountBalance: newUserBalance
      })
    
    dispatch(addTransaction(transaction.data))
  } catch (error) {
    console.log(error)
  }
}

// Reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return { ...state, transactions: [...action.transactions] }
    case ADD_TRANSACTION:
      return { ...state, transactions: [...state.transactions, action.transaction] }
    default:
      return state
  }
}


