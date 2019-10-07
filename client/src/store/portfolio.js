import axios from 'axios'
import store from './index'
const { ALPHAAPIKEY } = require('../secrets')

const initialState = {
  portfolio: [],
}

// Assign action types to labels
const GET_PORTFOLIO = 'GET_PORTFOLIO'
const ADD_PORTFOLIO_ENTRY = 'ADD_PORTFOLIO_ENTRY'

// Action creators
const gotPortfolio = portfolio => ({type: GET_PORTFOLIO, portfolio})
const addPortfolio = portfolioAddition => ({type: ADD_PORTFOLIO_ENTRY, portfolioAddition})