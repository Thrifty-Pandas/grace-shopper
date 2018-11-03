import React, {Component} from 'react'
import {Form, Divider} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {newUser, auth} from '../store/user'

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
    const error = this.props.error

    return (
      <div className="signup">
        <Form onSubmit={this.handleSubmit}>
          {error && error.response && <div> {error.response.data} </div>}

          <Divider horizontal>User Name</Divider>

          <Form.Input
            placeholder="Username"
            name="userName"
            value={userName}
            onChange={this.handleChange}
          />
          <Divider horizontal>First Name</Divider>

          <Form.Input
            placeholder="First Name"
            name="firstName"
            value={firstName}
            onChange={this.handleChange}
          />
          <Divider horizontal>Last Name</Divider>

          <Form.Input
            placeholder="Last Name"
            name="lastName"
            value={lastName}
            onChange={this.handleChange}
          />
          <Divider horizontal>Email</Divider>

          <Form.Input
            placeholder="email"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <Divider horizontal>Password</Divider>

          <Form.Input
            placeholder="Password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <Divider horizontal />

          <Form.Button content="Submit" />
        </Form>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    error: state.user.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addUser: user => dispatch(newUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm)
