import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOrders} from '../store'
import {OrdersGrid} from './index'

const mapStateToProps = ({orders}) => ({
  allOrders: orders.allOrders
})

const mapDispatchToProps = dispatch => ({
  fetchAllOrders: () => dispatch(fetchOrders())
})

class AllOrders extends Component {
  componentDidMount() {
    this.props.fetchAllOrders()
  }

  render() {
    const {allOrders} = this.props
    return (
      <div>
        <OrdersGrid allOrders={allOrders} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders)
