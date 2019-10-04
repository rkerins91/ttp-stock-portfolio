import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeState, register } from '../store/user'


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

  handleSubmit(event) {
    event.preventDefault()
    if (this.state.password1 === this.state.password2) {
      this.props.register(
        {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password1
        }
      )
    } else {
      alert('Please enter matching passwords')
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
    this.props.changeState(this.state)
  }

  render() {
    return (
      <div className="form">
        <form onSubmit={this.handleSubmit}>
          <input name="name" type="text" value={this.state.name} onChange={this.handleChange} placeholder="Enter Name" />
          <input name="email" type="text" value={this.state.email} onChange={this.handleChange} placeholder="Enter Email" />
          <input name="password1" type="password" value={this.state.password1} onChange={this.handleChange} placeholder="Enter Password" />
          <input name="password2" type="password" value={this.state.password2} onChange={this.handleChange} placeholder="Enter Password Again" />
          <button type='submit'>Login </button>
        </form>
      </div>
    )
  }
}


const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    register: (name, email, password) => dispatch(register(name, email, password)),
    changeState: (change) => dispatch(changeState(change))
  }
}


UserRegistration = connect(mapStateToProps, mapDispatchToProps)(UserRegistration)

export default UserRegistration

