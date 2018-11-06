import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOrders} from '../store'
import {OrdersGrid, FilterForm} from './index'

const mapStateToProps = ({orders, filter}) => ({
  allOrders: orders.allOrders,
  filter
})

const mapDispatchToProps = dispatch => ({
  fetchAllOrders: () => dispatch(fetchOrders())
})

const filterOrders = (allOrders, statusFilters) => {
  if (statusFilters.length) {
    allOrders.filter(order => {
      statusFilters.map(statusFilter => {
        if (statusFilter === order.status) {
          return order.status
        }
      })
    })
  } else {
    return allOrders
  }
}

class AllOrders extends Component {
  componentDidMount() {
    this.props.fetchAllOrders()
  }

  render() {
    const {allOrders, filter} = this.props
    const ordersToDisplay = filterOrders(allOrders, filter)
    return (
      <div>
        <FilterForm />
        <OrdersGrid allOrders={ordersToDisplay} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders)
