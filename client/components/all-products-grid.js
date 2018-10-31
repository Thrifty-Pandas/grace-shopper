import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'
import {ProductCard} from './index'
import {Grid} from 'semantic-ui-react'

const mapState = ({products, filter}) => ({products, filter})

const mapDispatch = {fetchProducts}

class AllProductsGrid extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const {products, filter} = this.props
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
}

export default connect(mapState, mapDispatch)(AllProductsGrid)
