import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Search} from './index'
import {logout} from '../store'
import {Menu, Image, Divider} from 'semantic-ui-react'

const Navbar = ({handleClick, isLoggedIn, user}) => (
  <Menu>
    <Menu.Item header>
      <Link to="/products">
        <Image
          src="http://www.stickpng.com/assets/images/580b57fcd9996e24bc43c39a.png"
          size="mini"
          verticalAlign="middle"
        />
        <Divider vertical hidden section />
        <span> Thrifty Panda</span>
      </Link>
    </Menu.Item>

    {isLoggedIn ? (
      <React.Fragment>
        <Menu.Item>
          <Link to="/home">User Home</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/cart">Cart</Link>
        </Menu.Item>
        <Menu.Item>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </Menu.Item>

        {user.id && user.isAdmin ? (
          <Menu.Item>
            <Link to="/adminUserMgmt">User Management</Link>{' '}
          </Menu.Item>
        ) : null}
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Menu.Item>
          <Link to="/login">Login</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/signup">Sign Up</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/cart">Cart</Link>
        </Menu.Item>
      </React.Fragment>
    )}
    <Menu.Item position="right">
      <Search />
    </Menu.Item>
  </Menu>
)

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
