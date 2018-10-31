import React from 'react'
import {Card, Icon, Image, Button} from 'semantic-ui-react'

//expects an entire product object as props
const CardExampleCard = props => {
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
        <Button>
          <Icon name="cart" />
          Add to Cart
        </Button>
      </Card.Content>
    </Card>
  )
}

export default CardExampleCard
