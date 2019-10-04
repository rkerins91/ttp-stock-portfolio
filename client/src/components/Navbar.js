import React, { Component } from 'react'
import { Link } from 'react-router-dom'

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
      <div>
        <Link to='/portfolio'>Portfolio</Link>
        <Link to='/transactions'>Transactions</Link>
      </div>
      )
    )
  }
}

