import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Search} from './index'
import {logout} from '../store'
import {me} from '../store/user'
import adminUserMgmt from './adminUserMgmt'
class Navbar extends Component {
  // const {handleClick, isLoggedIn} = props
  // props.getCurrentUser()
  // console.log('asdfwe', props.user)
  componentDidMount() {
    this.props.getCurrentUser()
  }
  render() {
    console.log('fsdsdf', this.props)
    return (
      <div>
        <Link to="/products">
          <h1>🐼 Thrifty Panda 🐼</h1>
        </Link>
        <nav>
          {this.props.isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/home">User Home</Link>
              <Link to="/cart">Cart</Link>
              <a href="#" onClick={this.props.handleClick}>
                Logout
              </a>
              {this.props.user.id && this.props.user.isAdmin ? (
                <Link to="/adminUserMgmt">User Management</Link>
              ) : null}
            </div>
          ) : (
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
              <Link to="/cart">Cart</Link>
            </div>
          )}
          <Search />
        </nav>
        <hr />
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    getCurrentUser: () => dispatch(me())
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
