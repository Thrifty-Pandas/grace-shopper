import React from 'react'
import {Table, Button, Image} from 'semantic-ui-react'
import CartItem from './cart-item'
import {connect} from 'react-redux'
import {getProductsInCartThunk} from '../store/cart'
import {fetchProducts} from '../store'
import {Link} from 'react-router-dom'

class UserCart extends React.Component {
  state = {}

  componentDidMount() {
    this.props.getProductsInCart()
    this.props.fetchProducts()
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.cart !== prevProps.cart) {
  //     this.props.getProductsInCart()
  //   }
  // }

  render() {
    // console.log('product list: ', this.props.products)
    // console.log('cart: ', this.props.cart)
    return (
      <div>
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
            {this.props.products.map(product => {
              return this.props.cart.map(
                cartProduct =>
                  product.id === cartProduct.productId ? (
                    <CartItem
                      key={product.id}
                      cartInfo={cartProduct}
                      productInfo={product}
                    />
                  ) : null
              )
            })}
          </Table.Body>
        </Table>
        <Link to="/checkout">
          <Button color="teal">Checkout</Button>{' '}
        </Link>
      </div>
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
  getProductsInCart: () => dispatch(getProductsInCartThunk()),
  fetchProducts: () => dispatch(fetchProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(UserCart)
