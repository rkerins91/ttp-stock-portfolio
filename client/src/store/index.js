import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { saveState, loadState } from './localStorage'
import user from './user'
import transactions from './transactions'
import portfolio from './portfolio'


const persistedState = loadState();
const reducer = combineReducers({ user, portfolio, transactions })
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, persistedState, middleware)

store.subscribe(() => {
  saveState({
    user: store.getState().user,
    transactions: store.getState().transactions,
    portfolio: store.getState().portfolio
  });
});

export default store