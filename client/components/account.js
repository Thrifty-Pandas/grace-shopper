import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Header, Icon, List, Grid, Table} from 'semantic-ui-react'
import {fetchOrdersById, fetchOrders} from '../store/orders'
import SingleOrder from './singleOrder'
import {logout} from '../store'

class Account extends Component {
  async componentDidMount() {
    await this.props.fetchOrders()
    console.log(this.props.orders)
  }
  render() {
    if (this.props.orders.allOrders[0]) {
      return (
        <div className="account-settings">
          <Header as="h2" icon>
            <Icon name="settings" />
            Account settings
            <Header.Subheader>
              Hello {this.props.user.firstName}, view your past orders here
            </Header.Subheader>
            <a href="#" onClick={this.props.logout}>
              Logout
            </a>
          </Header>

          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Order #</Table.HeaderCell>
                <Table.HeaderCell>Item</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            {this.props.orders.allOrders.map(order => {
              return (
                <SingleOrder order={order} />
                // <div>
                //   {order.products.map(product => {
                //     return <SingleOrder product={product} />
                //   })}{' '}
                // </div>
              )
            })}
          </Table>
        </div>
      )
    } else {
      return <h1>No orders</h1>
    }
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
    orders: state.orders
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchOrdersById: userId => dispatch(fetchOrdersById(userId)),
    fetchOrders: () => dispatch(fetchOrders()),
    logout: () => dispatch(logout())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Account)
