import React, { Component } from 'react'
import UserLogin from './UserLogin'
import Registration from './UserRegistration'
import './Auth.css'

export default class Auth extends Component {
  constructor(props) {
    super()
    this.state = {
      login: true
    }
  }
  render() {
    return (
      <div class='Auth-container'>
        <div class='Auth-tabs-container'>
          <div className={`Auth-tab ${this.state.login && 'Auth-tab-selected'}`} onClick={() => this.setState({login: true})}>Log In </div>
          <div className={`Auth-tab ${!this.state.login && 'Auth-tab-selected'}`} onClick={() => this.setState({login: false})}>Sign Up </div>
        </div>
        {this.state.login ?
        <UserLogin /> :
        <Registration />}
      </div>
    )
  }
}
