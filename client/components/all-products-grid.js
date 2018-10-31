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
        <Grid.Row>
          {allProducts.map(product => (
            <Grid.Column key={product.id}>
              <ProductCard {...product} />
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
    )
  }
}

export default connect(mapState, mapDispatch)(AllProductsGrid)
