import axios from 'axios'
const { ALPHAAPIKEY } = require('../secrets')


const initialState = {
  id: null,
  name: '',
  email: '',
  password1: '',
  password2: '',
  accountBalance: null,
  token: '',
  transactions: [],
  tickerSymbol: '',
  amount: null
}

const POST_USER = 'POST_USER'
const CHANGE_STATE = 'CHANGE_STATE'
const LOGIN_USER = 'LOGIN_USER'
const GET_TRANSACTIONS = 'GET_TRANSACTIONS'
const ADD_TRANSACTION = 'ADD_TRANSACTION'

const postUser = key => ({ type: POST_USER, key })
export const changeState = change => ({ type: CHANGE_STATE, change })
const loginUser = data => ({ type: LOGIN_USER, data })
const gotTransactions = transactions => ({ type: GET_TRANSACTIONS, transactions })
const addTransaction = transaction => ({ type: ADD_TRANSACTION, transaction })

export const register = register => async dispatch => {
  let res
  try {
    res = await axios.post(`http://localhost:8080/api/users`, register)
    dispatch(postUser(res.data.token))
  } catch (authError) {
    return dispatch(postUser({ error: authError }))
  }
}

export const login = (login) => async dispatch => {
  let res
  try {
    res = await axios.post(`http://localhost:8080/api/auth`, login)
    dispatch(loginUser(res.data))
  } catch (authError) {
    return dispatch(loginUser({ error: authError }))
  }
}

export const getTransactions = (userId, authKey) => async dispatch => {
  let res
  try {
    res = await axios.get(`http://localhost:8080/api/users/${userId}/transactions`,
      {
        headers: { 'x-auth-token': authKey }
      }
    )
    dispatch(gotTransactions(res.data.transactions))
  } catch (authError) {
    return dispatch(gotTransactions({ error: authError }))
  }
}

export const postTransaction = (symbol, amount, id) => async dispatch => {
  let res
  let transaction
  try {
    res = await axios.get('https://www.alphavantage.co/query?',
      {
        params:
        {
          function: 'GLOBAL_QUOTE',
          symbol,
          apikey: ALPHAAPIKEY
        }
      }
    )
    const data = res.data['Global Quote']
    if (res.data["Error Message"]) {
      alert('invalid ticker')
    }
    const price = Number(data['05. price']) * 100
    transaction = await axios.post('http://localhost:8080/api/transactions',
      {
        tickerName: symbol,
        tradePrice: price,
        tradeAmount: amount,
        userId: id
      })
    console.log('transaction', transaction)
    return dispatch(addTransaction(transaction))
  } catch (error) {
    console.log(error)
  }
}
// export

export default function (state = initialState, action) {
  switch (action.type) {
    case POST_USER:
      return { ...state, token: action.key }
    case CHANGE_STATE:
      return { ...state, ...action.change }
    case LOGIN_USER:
      return { ...state, ...action.data }
    case GET_TRANSACTIONS:
      return { ...state, transactions: [...action.transactions] }
    case ADD_TRANSACTION: {
      return { ...state, transactions: [...state.transactions, action.transaction] }
    }
    default:
      return state
  }
}


