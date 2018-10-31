import React from 'react'
import {Card, Icon, Image, Button} from 'semantic-ui-react'

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
      <Button>
        <Icon name="cart" />
        Add to Cart
      </Button>
    </div>
  )
}

export default ProductCard
