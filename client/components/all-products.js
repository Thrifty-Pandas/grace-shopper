import React, {Component} from 'react'
import {ProductsGrid, FilterForm} from './index'
import {connect} from 'react-redux'
import {fetchProducts} from '../store'

const mapState = ({products, filter, search}) => ({
  products: products.allProducts,
  filter,
  search
})

const mapDispatch = {fetchProducts}

const filterProducts = (products, categoryFilters, searchResultIds) => {
  //case where we filter based on categories and search bar
  if (categoryFilters.length && searchResultIds.length) {
    const searchResults = products.filter(product =>
      searchResultIds.includes(product.id)
    )

    return searchResults.filter(product => {
      return product.categories.some(category =>
        categoryFilters.includes(category.id)
      )
    })
  } else if (categoryFilters.length) {
    //case where we filter based on categories

    return products.filter(product => {
      //at least one of the product's categories should be included in the category filter selection

      return product.categories.some(category =>
        categoryFilters.includes(category.id)
      )
    })
  } else if (searchResultIds.length) {
    //case where we filter based on search results

    return products.filter(product => searchResultIds.includes(product.id))
  } else {
    //case where we do not filter
    return products
  }
}

export class AllProducts extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const {products, filter, search} = this.props
    const productsToDisplay = filterProducts(products, filter, search)
    return (
      <div>
        <FilterForm />
        <ProductsGrid products={productsToDisplay} />
      </div>
    )
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
