import React from 'react'
import {Card, Icon, Button} from 'semantic-ui-react'
import {addToCartThunk} from '../store/cart'
import {connect} from 'react-redux'

//expects an entire product object as props
const ProductCard = props => {
  const {id, name, description, price, imageUrl} = props

  return (
    <div>
      <Card
        size="large"
        image={imageUrl}
        header={name}
        meta={`$ ${price}`}
        description={description}
      />
      <Button onClick={() => props.addToCart(id, 1)}>
        <Icon name="cart" />
        Add to Cart
      </Button>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (productId, quantity) =>
      dispatch(addToCartThunk(productId, quantity))
  }
}

export default connect(null, mapDispatchToProps)(ProductCard)
