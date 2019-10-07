import axios from 'axios'


const initialState = {
  transactions: [],
}

const GET_TRANSACTIONS = 'GET_TRANSACTIONS'
const ADD_TRANSACTION = 'ADD_TRANSACTION'


const gotTransactions = transactions => ({type: GET_TRANSACTIONS, transactions})
const addTransaction = transaction => ({type: ADD_TRANSACTION, transaction})

export const getTransactions = (userId) => async dispatch => {
  let res
  try {
    res = await axios.get(`http://localhost:8080/api/users/${userId}/transactions`)
  } catch (authError) {
    return dispatch(gotTransactions({error: authError}))
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return {...state, token: action.key}
    default:
      return state
  }
}


