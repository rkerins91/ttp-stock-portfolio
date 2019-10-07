import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../store/user'
import { getTransactions } from '../store/transactions'
import { getPortfolio } from '../store/portfolio'
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

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  async handleSubmit(event) {
    event.preventDefault()
    await this.props.login(
      {
        email: this.state.email,
        password: this.state.password
      }
    )
    const { id, token } = this.props
    if (token) {
      await this.props.getTransactions(id, token)
      this.props.getPortfolio(id, token)
    } else {
      alert('Invalid credentials, please try again')
    }
  }

  render() {
    if (this.props.token) {
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
    token: state.user.token,
    id: state.user.id,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => dispatch(login(email, password)),
    getTransactions: (id, token) => dispatch(getTransactions(id, token)),
    getPortfolio: (transactions) => dispatch(getPortfolio(transactions))
  }
}


UserLogin = connect(mapStateToProps, mapDispatchToProps)(UserLogin)

export default UserLogin