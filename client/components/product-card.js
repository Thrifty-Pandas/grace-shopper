import React from 'react'
import {Card, Icon, Button, Image} from 'semantic-ui-react'
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
  const productExists =
    props.cart.findIndex(product => product.productId === id) === -1
  return (
    <React.Fragment>
      <Link to={`/products/${id}`}>
        <Card size="medium">
          <Card.Content header={name} />
          <Image src={imageUrl} height={175} width="auto" overflow="hidden" />
          <Card.Content extra>{`$ ${price}`}</Card.Content>
        </Card>
      </Link>
      <Button
        color="teal"
        onClick={() => {
          if (productExists) {
            props.addToCart(id)
          } else {
            props.editProductInCart(id)
          }
        }}
      >
        <Icon name="cart" />
        Add to Cart
      </Button>
    </React.Fragment>
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
