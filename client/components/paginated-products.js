import React, {Component} from 'react'
import {Pagination} from 'semantic-ui-react'
import {ProductsGrid} from './index'

// renders at most n products per page

const productsPerPage = 4

export default class PaginatedProducts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activePage: 1,
      productsOnPage: props.products.sort().slice(0, productsPerPage)
    }
  }

  handlePaginationChange = async (e, {activePage}) => {
    await this.setState({activePage})
    const startInd = (this.state.activePage - 1) * productsPerPage
    const endInd = startInd + productsPerPage
    this.setState({
      productsOnPage: this.props.products.sort().slice(startInd, endInd)
    })
  }

  static getDerivedStateFromProps(props, state) {
    const {activePage} = state
    const startInd = (activePage - 1) * productsPerPage
    const endInd = startInd + productsPerPage
    const {products} = props
    return {
      productsOnPage: products.sort().slice(startInd, endInd),
      activePage
    }
  }

  render() {
    return (
      <div>
        <ProductsGrid products={this.state.productsOnPage} />
        <Pagination
          activePage={this.state.activePage}
          onPageChange={this.handlePaginationChange}
          totalPages={Math.ceil(this.props.products.length / productsPerPage)}
        />
      </div>
    )
  }
}
