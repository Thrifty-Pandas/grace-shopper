import React from 'react'
import {Table, Link, Button, Image} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {fetchProductsInOrder} from '../store/orders'
import {fetchProducts} from '../store'

class OrderDetail extends React.Component {
  componentDidMount() {
    this.props.getProductsInOrder()
    this.props.fetchProducts()
  }

  render() {
    console.log('products -->', this.props.products)
    console.log('selectedOrder -->', this.props.selectedOrder)

    return (
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell singleLine>Product</Table.HeaderCell>
            <Table.HeaderCell singleLine>Price</Table.HeaderCell>
            <Table.HeaderCell singleLine>Quantity</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        {/* <Table.Body>
          {this.props.products.map(product => {
            return this.props.order.map(
              orderProduct =>
                product.id === orderProduct.productId ? (
                  <CartItem
                    key={product.id}
                    cartInfo={cartProduct}
                    productInfo={product}
                  />
                ) : null
            )
          })}
        </Table.Body> */}
      </Table>
    )
  }
}
const mapStateToProps = state => {
  return {
    products: state.products.allProducts,
    selectedOrder: state.orders.selectedOrder
  }
}

const mapDispatchToProps = dispatch => ({
  getProductsInOrder: () => dispatch(fetchProductsInOrder()),
  fetchProducts: () => dispatch(fetchProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail)

//fail to dispatch 'action getProductsInOrder'
