import React, { Component } from 'react'
import UserLogin from './UserLogin'
import Registration from './UserRegistration'
import './styles/Form.css'

export default class Auth extends Component {
  constructor(props) {
    super()
    this.state = {
      login: true
    }
  }
  
  render() {
    return (
      <div className='Form-container'>
        <div className='Form-tabs-container'>
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
