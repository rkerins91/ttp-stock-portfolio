import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeState, login } from '../store/user'
import { Redirect } from 'react-router-dom'

class UserLogin extends Component {
  constructor(props) {
    super()
    this.state = {
      email: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.login(
      {
        email: this.state.email,
        password: this.state.password
      }
    )
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
    this.props.changeState(this.state)
  }

  render() {
    console.log(this.props.loggedIn)
    if (this.props.loggedIn) {
      return <Redirect to='/portfolio' />
    }
    return (
      <div className="Form-form">
        <form onSubmit={this.handleSubmit}>
          <input 
            className='Form-text-input'
            name="email" 
            type="text" 
            value={this.state.email} 
            onChange={this.handleChange} 
            placeholder="Enter Email" />
          <input 
            className='Form-text-input'
            name="password"
            type="password" 
            value={this.state.password} 
            onChange={this.handleChange} 
            placeholder="Enter Password" />
          <button className='Form-submit' type='submit'>Login </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.user.token && true
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => dispatch(login(email, password)),
    changeState: (change) => dispatch(changeState(change))
  }
}


UserLogin = connect(mapStateToProps, mapDispatchToProps)(UserLogin)

export default UserLogin