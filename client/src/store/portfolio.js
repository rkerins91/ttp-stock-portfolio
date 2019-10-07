import axios from 'axios'
import store from './index'
const  ALPHAAPIKEY  = process.env.ALPHAAPIKEY

const initialState = {
  portfolio: [],
  portfolioDisplayProperties: []
}

// Assign action types to labels
const GET_PORTFOLIO = 'GET_PORTFOLIO'
const ADD_PORTFOLIO_ENTRY = 'ADD_PORTFOLIO_ENTRY'

// Action creators
const gotPortfolio = portfolio => ({ type: GET_PORTFOLIO, portfolio })
const addPortfolio = portfolioAddition => ({ type: ADD_PORTFOLIO_ENTRY, portfolioAddition })


// Thunks
export const getPortfolio = (id, token) => async dispatch => {

  const { data } = await axios.get(`/api/users/${id}/portfolio`,
    {
      headers: { 'x-form-token': token }
    }
  )

  const ownedStocks = await Promise.all(data.portfolios.map(async portfolio => {
    return axios.get('https://www.alphavantage.co/query?',
      {
        params:
        {
          function: 'GLOBAL_QUOTE',
          symbol: portfolio.tickerName,
          apikey: ALPHAAPIKEY
        }
      }
    )
  }
  ))
  const portfolioDisplayProperties = ownedStocks.map(stock => {
    const stockInfo = stock.data['Global Quote']
    return {
      stockName: stockInfo['01. symbol'],
      stockOpen: stockInfo['02. open'],
      stockPrice: stockInfo['05. price'],
      stockChange: stockInfo['10. change percent'],
      quantity: stock.amountOwned
    }
  })
  if (portfolioDisplayProperties) {
    dispatch(gotPortfolio(portfolioDisplayProperties))
  }
}

export const addPortfolioEntry = (tickerName, amount, id) => async dispatch => {

  const displayInfo = await axios.get('https://www.alphavantage.co/query?',
    {
      params:
      {
        function: 'GLOBAL_QUOTE',
        symbol: tickerName,
        apikey: ALPHAAPIKEY
      }
    })
  const stockInfo = displayInfo.data['Global Quote']
  if (stockInfo) {

    const { data } = await axios.post(`/api/portfolio`,
      {
        tickerName, amount, userId: id
      }
    )

    let portfolio = store.getState().portfolio.portfolioDisplayProperties
    if (!portfolio.some(ele => ele.stockName === tickerName)) {
    dispatch(addPortfolio({
      stockName: stockInfo['01. symbol'],
      stockOpen: stockInfo['02. open'],
      stockPrice: stockInfo['05. price'],
      stockChange: stockInfo['10. change percent'],
      quantity: data.amountOwned
    }))}
  }

}

// Reducer
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PORTFOLIO:
      return { ...state, portfolioDisplayProperties: [...action.portfolio] }
    case ADD_PORTFOLIO_ENTRY:
      return { ...state, portfolioDisplayProperties: [...state.portfolioDisplayProperties, action.portfolioAddition] }
    default:
      return state
  }
}