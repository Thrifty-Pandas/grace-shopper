import React from 'react'
import {connect} from 'react-redux'

//renders the reviews for the selected product

const mapState = ({products}) => ({product: products.selectedProduct})

const ProductReviews = props => {
  const {product} = props
  return <div />
}

export default connect(mapState)(ProductReviews)
