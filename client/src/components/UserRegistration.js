import React, { Component } from 'react'
import { connect } from 'react-redux'
import { register } from '../store/user'
import { getTransactions } from '../store/transactions'
import { getPortfolio } from '../store/portfolio'
import { Redirect } from 'react-router-dom'


class UserRegistration extends Component {
  constructor(props) {
    super()
    this.state = {
      name: '',
      email: '',
      password1: '',
      password2: ''
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
    if (this.state.password1 !== this.state.password2) {
      alert('Please enter matching passwords')
    } else if (!this.state.name) {
      alert('Name can not be empty')
    } else if (this.state.password1.length < 8){
      alert('Password must have 8 chacters')
    } else {
      await this.props.register(
        {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password1
        }
      )
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
            name="name" 
            type="text" 
            value={this.state.name} 
            onChange={this.handleChange} 
            placeholder="Enter Name" />
          <input 
            className='Form-text-input'
            name="email" 
            type="email" 
            value={this.state.email} 
            onChange={this.handleChange} 
            placeholder="Enter Email" />
          <input 
            className='Form-text-input'
            name="password1" 
            type="password" 
            value={this.state.password1} 
            onChange={this.handleChange} 
            placeholder="Enter Password" />
          <input 
            className='Form-text-input'
            name="password2" 
            type="password" 
            value={this.state.password2} 
            onChange={this.handleChange} 
            placeholder="Enter Password Again" />
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
    register: (name, email, password) => dispatch(register(name, email, password)),
    getTransactions: (id, token) => dispatch(getTransactions(id, token)),
    getPortfolio: (transactions) => dispatch(getPortfolio(transactions))
  }
}


UserRegistration = connect(mapStateToProps, mapDispatchToProps)(UserRegistration)

export default UserRegistration

