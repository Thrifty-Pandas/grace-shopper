import React from 'react'
import {Table} from 'semantic-ui-react'
import {CartItem} from './index'
import {connect} from 'react-redux'
import {getProductsInCartThunk} from '../store/cart'

class UserCart extends React.Component {
  state = {}

  componentDidMount() {
    this.props.getProductsInCartThunk()
  }

  render() {
    return (
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell singleLine>Product</Table.HeaderCell>
            <Table.HeaderCell singleLine>Price</Table.HeaderCell>
            <Table.HeaderCell singleLine>Quantity</Table.HeaderCell>
            <Table.HeaderCell singleLine>Update</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.props.products.forEach(product => {
            this.props.cart.map(cartProduct => {
              if (cartProduct.productId === product.id) {
                return (
                  <CartItem
                    key={product.id}
                    cartInfo={cartProduct}
                    productInfo={product}
                  />
                )
              }
            })
          })}
        </Table.Body>
      </Table>
    )
  }
}
const mapStateToProps = state => {
  return {
    products: state.products.allProducts,
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => ({
  getProductsInCart: () => dispatch(getProductsInCartThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserCart)
