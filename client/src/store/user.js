import axios from 'axios'


const initialState = {
  name: '',
  email: '',
  password1: '',
  password2: '',
  accountBalance: null,
  token: ''
}

const POST_USER = 'POST_USER'
const CHANGE_REGISTRATION_INFO = 'CHANGE_REGISTRATION_INFO'
const LOGIN_USER = 'LOGIN_USER'
const CHANGE_LOGIN_INFO = 'CHANGE_LOGIN_INFO'

const postUser = key => ({type: POST_USER, key})
export const changeRegistrationInfo = change => ({type: CHANGE_REGISTRATION_INFO, change})
const loginUser = data => ({type: LOGIN_USER, data})
export const changeLoginInfo = change => ({type: CHANGE_LOGIN_INFO, change})

export const register = (register) => async dispatch => {
  let res
  try {
    res = await axios.post(`http://localhost:8080/api/users`, register)
  } catch (authError) {
    return dispatch(postUser({error: authError}))
  }
  try {
    dispatch(postUser(res.data.token))
  } catch (error) {
    console.error(error)
  }
}

export const login = (login) => async dispatch => {
  let res
  try {
    res = await axios.post(`http://localhost:8080/api/auth`, login)
  } catch (authError) {
    return dispatch(loginUser({error: authError}))
  }
  try {
    dispatch(loginUser(res.data))
  } catch (error) {
    console.error(error)
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case POST_USER:
      return {...state, token: action.key}
    case CHANGE_REGISTRATION_INFO:
      return {...state, ...action.change}
    case LOGIN_USER:
      return {...state, ...action.data}
    case CHANGE_LOGIN_INFO:
      return {...state, ...action.change}
    default:
      return state
  }
}


