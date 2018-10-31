import React from 'react'
import {Card, Icon, Image, Button} from 'semantic-ui-react'

//expects an entire product object as props
const ProductCard = props => {
  const {id, name, description, price, imageUrl} = props

  return (
    <Card>
      <Image src={`/public${imageUrl}`} />
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>
          <span className="price">${price}</span>
        </Card.Meta>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button>
          <Icon name="cart" />
          Add to Cart
        </Button>
      </Card.Content>
    </Card>
  )
}

export default ProductCard
