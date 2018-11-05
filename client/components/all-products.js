import React, {Component} from 'react'
import {PaginatedProducts, FilterForm} from './index'
import {Header} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store'
import {getProductsInCartThunk} from '../store/cart'

const mapState = ({products, filter, search, cart}) => ({
  products: products.allProducts,
  filter,
  search,
  cart
})

const mapDispatch = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts()),
  getProductsInCartThunk: () => dispatch(getProductsInCartThunk())
})

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
    this.props.getProductsInCartThunk()
  }

  render() {
    const {products, filter, search} = this.props
    const productsToDisplay = filterProducts(products, filter, search)
    return (
      <div>
        <FilterForm />
        {search[0] === 'not found' ? (
          <Header>Sorry, we couldn't find any results</Header>
        ) : (
          <PaginatedProducts products={productsToDisplay} />
        )}
      </div>
    )
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
