import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOrders} from '../store'
import {OrdersGrid} from './index'

const mapStateToProps = ({orders}) => ({orders})

const mapDispatchToProps = dispatch => ({
  fetchOrders: () => dispatch(fetchOrders())
})

class AllOrders extends Component {
  componentDidMount() {
    this.props.fetchOrders()
  }
  render() {
    const {orders} = this.props
    console.log('this.props-->', this.props)
    return (
      <div>
        <OrdersGrid orders={orders} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders)
