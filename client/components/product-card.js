import React from 'react'
import {Card, Icon, Image, Button} from 'semantic-ui-react'
import {addToCartThunk} from '../store/cart'
import {connect} from 'react-redux'

//expects an entire product object as props
const ProductCard = props => {
  const {id, name, description, price, photo} = props

  return (
    <Card>
      <Image src={`/public/${photo}`} />
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>
          <span className="price">{price}</span>
        </Card.Meta>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button onClick={() => props.addToCart(id, 1)}>
          <Icon name="cart" />
          Add to Cart
        </Button>
      </Card.Content>
    </Card>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (productId, quantity) =>
      dispatch(addToCartThunk(productId, quantity))
  }
}

export default connect(null, mapDispatchToProps)(ProductCard)
