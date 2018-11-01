import React, {Component} from 'react'
import {ProductsGrid, FilterForm} from './index'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'

const mapState = ({products, filter}) => ({products, filter})

const mapDispatch = {fetchProducts}

export class AllProducts extends Component {
  constructor() {
    super()
    this.state = {
      productsToDisplay: []
    }
  }

  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const {productsToDisplay} = this.state
    return (
      <div>
        <FilterForm />
        <ProductsGrid products={productsToDisplay} />
      </div>
    )
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
