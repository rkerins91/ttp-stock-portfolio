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
  portfolio: [],
  tickerSymbol: '',
  amount: null
}

const POST_USER = 'POST_USER'
const CHANGE_STATE = 'CHANGE_STATE'
const LOGIN_USER = 'LOGIN_USER'
const GET_TRANSACTIONS = 'GET_TRANSACTIONS'
const ADD_TRANSACTION = 'ADD_TRANSACTION'
const GET_PORTFOLIO = 'GET_PORTFOLIO'

const postUser = key => ({ type: POST_USER, key })
export const changeState = change => ({ type: CHANGE_STATE, change })
const loginUser = data => ({ type: LOGIN_USER, data })
const gotTransactions = transactions => ({ type: GET_TRANSACTIONS, transactions })
const addTransaction = transaction => ({ type: ADD_TRANSACTION, transaction })
const gotPortfolio = portfolio => ({type: GET_PORTFOLIO, portfolio})

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
  console.log('get transactions called')
  let res
  try {
    res = await axios.get(`http://localhost:8080/api/users/${userId}/transactions`,
      {
        headers: { 'x-Form-token': authKey }
      }
    )
    dispatch(gotTransactions(res.data.transactions))
  } catch (authError) {
    return dispatch(gotTransactions({ error: authError }))
  }
}

export const getPortfolio = (transactions) => async dispatch => {

  const portfolio = {}

  for (let key in transactions) {
    const tickerName = transactions[key].tickerName
    if (portfolio[tickerName]) {
      portfolio[tickerName] += transactions[key].tradeAmount
    } else {
      portfolio[tickerName] = transactions[key].tradeAmount
    }
  }

  let tickerSymbols = Object.keys(portfolio)
  console.log(tickerSymbols)

  const ownedStocks = await Promise.all(tickerSymbols.map(async tickerSymbol => {
    return axios.get('https://www.alphavantage.co/query?',
      {
        params:
        {
          function: 'GLOBAL_QUOTE',
          symbol: tickerSymbol,
          apikey: ALPHAAPIKEY
        }
      }
    )
  }
  ))
  console.log(ownedStocks)
  const result = ownedStocks.map(ele => {
    console.log(ele)
    const stockInfo = ele.data['Global Quote']
    return {
      stockName: stockInfo['01. symbol'], 
      stockOpen: stockInfo['02. open'], 
      stockPrice: stockInfo['05. price'],
      stockChange: stockInfo['10. change percent']}
  })
  dispatch(gotPortfolio(result))
}

export const postTransaction = (symbol, amount, id, userBalance) => async dispatch => {
  console.log('ub', userBalance)
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
    console.log(res)
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
    return dispatch(addTransaction(transaction))
  } catch (error) {
    console.log(error)
  }
}

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
    case ADD_TRANSACTION: 
      return { ...state, transactions: [...state.transactions, action.transaction] }
    case GET_PORTFOLIO:
      return { ...state, portfolio: [...action.portfolio]}
    default:
      return state
  }
}


