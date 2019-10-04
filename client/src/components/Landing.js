import React, { Component } from 'react'
import UserLogin from './UserLogin'
import Registration from './UserRegistration'
import './Landing.css'

export default class Landing extends Component {
  constructor(props) {
    super()
    this.state = {
      login: true
    }
  }
  render() {
    return (
      <div>
        <div id='Landing-user-auth-tabs'>
          <div className='Landing-user-auth-tab' onClick={() => this.setState({login: true})}>Log In </div>
          <div className='Landing-user-auth-tab' onClick={() => this.setState({login: false})}>Sign Up </div>
        </div>
        {this.state.login ?
        <UserLogin /> :
        <Registration />}
      </div>
    )
  }
}
