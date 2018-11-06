import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOrders} from '../store'
import {OrdersGrid, OrderFilterForm} from './index'

const mapStateToProps = ({orders, orderfilter}) => ({
  allOrders: orders.allOrders,
  orderfilter
})

const mapDispatchToProps = dispatch => ({
  fetchAllOrders: () => dispatch(fetchOrders())
})

const filterOrders = (allOrders, statusFilter) => {
  if (statusFilter.length) {
    // console.log(
    //   'mapping, filtering',
    //   statusFilter.map(status =>
    //     allOrders.filter(order => status === order.status)
    //   )
    // )
    return allOrders.filter(order => statusFilter.includes(order.status))
  } else {
    return allOrders
  }
}

class AllOrders extends Component {
  componentDidMount() {
    this.props.fetchAllOrders()
  }

  render() {
    const {allOrders, orderfilter} = this.props
    const ordersToDisplay = filterOrders(allOrders, orderfilter)
    console.log('ordersToDisplay->', ordersToDisplay)
    return (
      <div>
        <OrderFilterForm />
        <OrdersGrid ordersToDisplay={ordersToDisplay} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders)
