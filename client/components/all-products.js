import React, {Component} from 'react'
import {ProductsGrid, FilterForm} from './index'
import {connect} from 'react-redux'
import {fetchProducts} from '../store'

const mapState = ({products, filter}) => ({
  products: products.allProducts,
  filter
})

const mapDispatch = {fetchProducts}

const filterProducts = (products, categoryFilters, searchResultIds) => {
  if (categoryFilters.length) {
    return products.filter(product => {
      //at least one of the product's categories should be included in the category filter selection

      return product.categories.some(category =>
        categoryFilters.includes(category.id)
      )
    })
  } else {
    return products
  }
}

export class AllProducts extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const {products, filter} = this.props
    const productsToDisplay = filterProducts(products, filter)
    return (
      <div>
        <FilterForm />
        <ProductsGrid products={productsToDisplay} />
      </div>
    )
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
