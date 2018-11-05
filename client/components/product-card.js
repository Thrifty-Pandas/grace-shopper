import React from 'react'
import {Card, Icon, Image, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {
  getProductsInCartThunk,
  addToCartThunk,
  editProductInCart
} from '../store/cart'
import {connect} from 'react-redux'

//expects an entire product object as props
const ProductCard = props => {
  const {id, name, description, price, imageUrl} = props
  return (
    <div>
      <Link to={`/products/${id}`}>
        <Card
          size="large"
          image={imageUrl}
          header={name}
          meta={`$ ${price}`}
          description={description}
        />
      </Link>
      <Button
        onClick={() => {
          if (
            props.cart.findIndex(product => product.productId === id) === -1
          ) {
            props.addToCart(id)
          } else {
            props.editProductInCart(id)
          }
        }}
      >
        <Icon name="cart" />
        Add to Cart
      </Button>
    </div>
  )
}

const mapStateToProps = state => {
  return {cart: state.cart}
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (productId, quantity) =>
      dispatch(addToCartThunk(productId, quantity)),
    editProductInCart: (productId, quantity) => {
      dispatch(editProductInCart(productId, quantity))
    },
    getProductsInCartThunk: () => dispatch(getProductsInCartThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard)
