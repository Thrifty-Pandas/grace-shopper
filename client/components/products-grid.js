import React from 'react'
import {ProductCard} from './index'
import {Grid, Card} from 'semantic-ui-react'

//takes an array of products and renders a grid of product cards

const ProductsGrid = props => {
  const {products} = props
  return (
    <Grid>
      <Grid.Row stretched>
        {products.map(product => (
          <Grid.Column key={product.id} width={4}>
            <ProductCard {...product} />
          </Grid.Column>
        ))}
      </Grid.Row>
    </Grid>
  )
}

export default ProductsGrid
