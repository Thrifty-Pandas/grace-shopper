import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'

const mapState = ({products}) => ({products})

const mapDispatch = {fetchProducts}

class AllPages extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const {products} = this.props
    return (
      <div>
        <ul>
          {products.map(product => <li key={product.id}>{product.name}</li>)}
        </ul>
      </div>
    )
  }
}

export default connect(mapState, mapDispatch)(AllPages)
