import React, {Component} from 'react'
import {Form} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {newUser} from '../store/user'

class UserForm extends Component {
  constructor() {
    super()
    this.state = {
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = evt =>
    this.setState({
      [evt.target.name]: evt.target.value
    })

  handleSubmit = evt => {
    evt.preventDefault()
    const {userName, firstName, lastName, email, password} = this.state
    const newUserInfo = {userName, firstName, lastName, email, password}
    this.props.addUser(newUserInfo)
    this.setState({
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    })
  }

  render() {
    const {userName, firstName, lastName, email, password} = this.state

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Input
            placeholder="Username"
            name="userName"
            value={userName}
            onChange={this.handleChange}
          />
          <Form.Input
            placeholder="First Name"
            name="firstName"
            value={firstName}
            onChange={this.handleChange}
          />
          <Form.Input
            placeholder="Last Name"
            name="lastName"
            value={lastName}
            onChange={this.handleChange}
          />
          <Form.Input
            placeholder="email"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <Form.Input
            placeholder="Password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <Form.Button content="Submit" />
        </Form.Group>
      </Form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addUser: user => dispatch(newUser(user))
  }
}

export default connect(null, mapDispatchToProps)(UserForm)
