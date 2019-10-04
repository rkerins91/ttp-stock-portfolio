import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeLoginInfo, login } from '../store/user'

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
    this.props.changeLoginInfo(this.state)
  }

  render() {
    return (
      <div class="form">
        <form onSubmit={this.handleSubmit}>
          <input name="email" type="text" value={this.state.email} onChange={this.handleChange} placeholder="Enter Email" />
          <input name="password" type="password" value={this.state.password} onChange={this.handleChange} placeholder="Enter Password" />
          <button type='submit'>Login </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => dispatch(login(email, password)),
    changeLoginInfo: (change) => dispatch(changeLoginInfo(change))
  }
}


const Login = connect(mapStateToProps, mapDispatchToProps)(UserLogin)

export default Login