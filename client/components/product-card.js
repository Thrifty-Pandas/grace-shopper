import React from 'react'
import {Card, Icon, Image, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

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
      <Button>
        <Icon name="cart" />
        Add to Cart
      </Button>
    </div>
  )
}

export default ProductCard
