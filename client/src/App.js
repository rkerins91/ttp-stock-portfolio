import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store'
import Navbar from './components/Navbar'
import Auth from './components/Auth'
import Portfolio from './components/Portfolio'
import Transactions from './components/TransactionsList'

const App = () => (
  <Provider store={store}>
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Auth} />
          <Route exact path='/portfolio' component={Portfolio}/>
          <Route exact path='/transactions' component={Transactions}/>
        </Switch>
      </>
    </Router>
  </Provider>
)

export default App;
