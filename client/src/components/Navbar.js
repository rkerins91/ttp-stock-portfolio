import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import TransactionsList from './TransactionsList';
import './styles/Navbar.css'

export default class Navbar extends Component {
  constructor(props) {
    super()
    this.state = {
      loggedIn: true
    }

  }
  render() {
    const activeStyle = {color: '#35e535'}
    return (
      this.state.loggedIn && (
      <div id='Navbar'>
        <div className='Navbar-divider'>
          <h1 id='Navbar-title'>TTP Stock Portfolio</h1>
        </div>
        <div className='Navbar-divider' id='Navbar-link-container'>
          <NavLink to='/portfolio' className='Navbar-link' activeStyle={activeStyle}>Portfolio</NavLink>
          <NavLink to='/transactions' className='Navbar-link' activeStyle={activeStyle}>Transactions</NavLink>
        </div>
      </div>
      )
    )
  }
}

