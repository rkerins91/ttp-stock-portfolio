import axios from 'axios'
const { ALPHAAPIKEY } = require('../secrets')

const initialState = {
  id: null,
  name: '',
  email: '',
  accountBalance: null,
  token: ''
}

// Assign action types to labels
const LOGIN_USER = 'LOGIN_USER'
const UPDATE_BALANCE = 'UPDATE_BALANCE'

// Action creators
const loginUser = data => ({ type: LOGIN_USER, data })
const updateBalance = updatedBalance => ({type: UPDATE_BALANCE, updatedBalance})


// Thunks
export const register = register => async dispatch => {
  try {
    const { data } = await axios.post(`http://localhost:8080/api/users`, register)
    delete data.createdAt
    delete data.updatedAt    
    dispatch(loginUser(data))
  } catch (authError) {
    return dispatch(loginUser({ error: authError }))
  }
}

export const login = (login) => async dispatch => {
  try {
    const res = await axios.post(`http://localhost:8080/api/auth`, login)
    delete res.data.createdAt
    delete res.data.updatedAt
    dispatch(loginUser(res.data))
  } catch (authError) {
    return dispatch(loginUser({ error: authError }))
  }
}

export const getUpdatedBalance = (id) => async dispatch => {
  try {
    const { data } = await axios.get(`http://localhost:8080/api/users/${id}`)
    dispatch(updateBalance(data.accountBalance))
  } catch (error) {
    console.log('something went wrong')
  }
}

// Reducer
export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, ...action.data }
    case UPDATE_BALANCE:
      return { ...state, accountBalance: action.updatedBalance }
    default:
      return state
  }
}


