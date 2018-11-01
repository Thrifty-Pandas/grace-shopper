import React, {Component} from 'react'
import {ProductsGrid, FilterForm} from './index'
import {connect} from 'react-redux'
import {fetchProducts} from '../store'

const mapState = ({products, filter}) => ({products, filter})

const mapDispatch = {fetchProducts}

const filterProducts = (products, categoryFilters) => {
  if (categoryFilters.length) {
    return products.filter(product => {
      product.categories.includes(...categoryFilters)
    })
  } else {
    return products
  }
}

export class AllProducts extends Component {
  constructor() {
    super()
    this.state = {
      productsToDisplay: []
    }
  }

  async componentDidMount() {
    await this.props.fetchProducts()
    const {products, filter} = this.props
    const filteredProducts = filterProducts(products, filter)
    this.setState({productsToDisplay: filteredProducts})
  }

  componentDidUpdate() {
    const {products, filter} = this.props
    const filteredProducts = filterProducts(products, filter)
    this.setState({productsToDisplay: filteredProducts})
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
