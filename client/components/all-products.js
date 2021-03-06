import React, {Component} from 'react'
import {
  PaginatedProducts,
  FilterForm,
  AddCategoryForm,
  AddProduct
} from './index'
import {Header, Button, Icon, Grid, GridRow, Image} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store'
import {getProductsInCartThunk} from '../store/cart'

const mapState = ({products, filter, search, cart, user}) => ({
  products: products.allProducts,
  filter,
  search,
  cart,
  user
})

const mapDispatch = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts()),
  getProductsInCart: () => dispatch(getProductsInCartThunk())
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
  constructor() {
    super()
    this.state = {
      addProductisOpened: false,
      addCategoryisOpened: false
    }
    this.toggleAddProduct = this.toggleAddProduct.bind(this)
    this.toggleAddCategory = this.toggleAddCategory.bind(this)
  }
  componentDidMount() {
    this.props.getProductsInCart()
    this.props.fetchProducts()
  }

  toggleAddProduct() {
    const {addProductisOpened} = this.state
    this.setState({
      addProductisOpened: !addProductisOpened
    })
  }

  toggleAddCategory() {
    const {addCategoryisOpened} = this.state
    this.setState({
      addCategoryisOpened: !addCategoryisOpened
    })
  }

  render() {
    const {products, filter, search} = this.props
    const productsToDisplay = filterProducts(products, filter, search)
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Header as="h2" icon textAlign="center">
              <Image
                src="http://www.stickpng.com/assets/images/580b57fcd9996e24bc43c39a.png"
                circular
              />
              <Header.Content>Panda Products</Header.Content>
            </Header>
          </Grid.Row>
          <Grid.Column width={3} stretched>
            <Grid.Row>
              <FilterForm />
            </Grid.Row>
            <Grid.Row>
              {this.props.user.id && this.props.user.isAdmin ? (
                <div>
                  <Button
                    onClick={() => {
                      this.toggleAddCategory()
                    }}
                  >
                    <Icon name="add" />Add a Category{' '}
                  </Button>
                  <Button
                    onClick={() => {
                      this.toggleAddProduct()
                    }}
                  >
                    <Icon name="add" />
                    Add a Product
                  </Button>
                </div>
              ) : null}
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={13}>
            {search[0] === 'not found' ? (
              <Header>Sorry, we couldn't find any results</Header>
            ) : (
              <PaginatedProducts products={productsToDisplay} />
            )}
            <GridRow>{this.state.addProductisOpened && <AddProduct />}</GridRow>
            <Grid.Row>
              {this.state.addCategoryisOpened && <AddCategoryForm />}
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
