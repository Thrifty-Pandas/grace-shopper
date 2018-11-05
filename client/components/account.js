import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Header, Icon, List} from 'semantic-ui-react'
import {fetchOrdersById} from '../store/orders'

class Account extends Component {
  async componentDidMount() {
    await this.props.fetchOrdersById(1)
    console.log(this.props.orders[0])
  }
  render() {
    if (this.props.orders[0]) {
      return (
        <div className="account-settings">
          <Header as="h2" icon>
            <Icon name="settings" />
            Account settings
            <Header.Subheader>
              Hello {this.props.user.firstName}, view your past orders here
            </Header.Subheader>
          </Header>
          <List divided relaxed>
            {this.props.orders[0].products.map(product => {
              return (
                <List.Item>
                  <List.Content>
                    Product: {product.name}
                    price: {product.price}
                    Total: ${this.props.orders[0].price}
                  </List.Content>
                </List.Item>
              )
            })}
          </List>
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
    fetchOrdersById: userId => dispatch(fetchOrdersById(userId))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Account)
