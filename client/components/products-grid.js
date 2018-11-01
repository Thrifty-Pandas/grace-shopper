import React from 'react'
import {ProductCard} from './index'
import {Grid} from 'semantic-ui-react'

//takes an array of products and renders a grid of product cards

const ProductsGrid = props => {
  const {products} = props
  const {allProducts} = products
  return (
    <Grid>
      {allProducts.map(product => (
        <Grid.Column key={product.id} width={4}>
          <ProductCard {...product} />
        </Grid.Column>
      ))}
    </Grid>
  )
}

export default ProductsGrid
