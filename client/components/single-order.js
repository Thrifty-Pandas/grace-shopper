import React from 'react'
import {Table} from 'semantic-ui-react'

import OrderItem from './order-item'
import {connect} from 'react-redux'
import {fetchSingleOrder} from '../store/orders'

class OrderDetail extends React.Component {
  componentDidMount() {
    const orderId = Number(this.props.match.params.ordersId)

    this.props.getProductsInOrder(orderId)
  }

  render() {
    return (
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell singleLine>Product</Table.HeaderCell>
            <Table.HeaderCell singleLine>Price</Table.HeaderCell>
            <Table.HeaderCell singleLine>Quantity</Table.HeaderCell>
            <Table.HeaderCell singleLine>Product Total</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.props.products
            ? this.props.products.map(product => {
                return (
                  <OrderItem
                    key={product.id}
                    cartInfo={product.orderProduct}
                    productInfo={product}
                  />
                )
              })
            : null}
        </Table.Body>
      </Table>
    )
  }
}
const mapStateToProps = state => {
  return {
    products: state.orders.selectedOrder.products
  }
}

const mapDispatchToProps = dispatch => ({
  getProductsInOrder: id => dispatch(fetchSingleOrder(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail)

//fail to dispatch 'action getSingleOrder'
