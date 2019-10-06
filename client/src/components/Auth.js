import React, { Component } from 'react'
import UserLogin from './UserLogin'
import Registration from './UserRegistration'
import './Form.css'

export default class Auth extends Component {
  constructor(props) {
    super()
    this.state = {
      login: true
    }
  }
  render() {
    return (
      <div class='Form-container'>
        <div class='Form-tabs-container'>
          <div className={`Form-tab ${this.state.login && 'Form-tab-selected'}`} onClick={() => this.setState({login: true})}>Log In </div>
          <div className={`Form-tab ${!this.state.login && 'Form-tab-selected'}`} onClick={() => this.setState({login: false})}>Sign Up </div>
        </div>
        {this.state.login ?
        <UserLogin /> :
        <Registration />}
      </div>
    )
  }
}
