import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Button, Form, Grid, Header, Message, Segment} from 'semantic-ui-react'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="login-form">
      <style>{`
      body > div,
      body > div > div,
       body > div > div > div.login-form {
         height: 100%;
       }
     `}</style>
      <Grid textAlign="center" style={{height: '100%'}} verticalAlign="middle">
        <Grid.Column style={{maxWidth: 450}}>
          <Header as="h2" color="teal" textAlign="center">
            Welcome back!
          </Header>
          <Form onSubmit={handleSubmit} name={name}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                name="email"
                type="text"
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                name="password"
                type="password"
              />
              <Button color="teal" fluid size="large" type="submit">
                {displayName}
              </Button>
              <a href="/auth/google">{displayName} with Google</a>
              {error && error.response && <div> {error.response.data} </div>}
            </Segment>
          </Form>
          <Message>
            New Panda 🐼 ? <a href="/signup">Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
