import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TransactionsList from './TransactionsList';
import './Navbar.css'

export default class Navbar extends Component {
  constructor(props) {
    super()
    this.state = {
      loggedIn: true
    }

  }
  render() {
    return (
      this.state.loggedIn && (
      <div id='Navbar'>
        <div className='Navbar-divider'>
          <h1 id='Navbar-title'>TTP Stock Portfolio</h1>
        </div>
        <div className='Navbar-divider' id='Navbar-link-container'>
          <Link to='/portfolio' className='Navbar-link'>Portfolio</Link>
          <Link to='/transactions' className='Navbar-link'>Transactions</Link>
        </div>
      </div>
      )
    )
  }
}

