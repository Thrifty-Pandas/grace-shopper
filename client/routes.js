import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'

import {
  Login,
  Signup,
  OrderDetail,
  UserHome,
  AllProducts,
  AllOrders,
  SingleProduct,
  Cart,
  CheckoutPage
} from './components'

import {getProductsInCartThunk} from './store/cart'
import {me, fetchCategories, fetchProducts} from './store'
import UserForm from './components/userForm'
import AdminUserMgmt from './components/adminUserMgmt'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/products/:productId" component={SingleProduct} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={UserForm} />
        <Route path="/products" component={AllProducts} />
        <Route path="/cart" component={Cart} />
        <Route path="/orders/:ordersId" component={OrderDetail} />
        <Route path="/checkout" component={CheckoutPage} />
        <Route path="/orders" component={AllOrders} />
        <Route path="/adminUserMgmt" component={AdminUserMgmt} />
        <Route exact path="/" component={AllProducts} />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
      dispatch(getProductsInCartThunk())
      dispatch(fetchCategories())
      dispatch(fetchProducts())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
