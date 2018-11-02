import React from 'react'
import {connect} from 'react-redux'
import {Item, Rating} from 'semantic-ui-react'
import {Review} from './index'

//renders the reviews for the selected product

const mapState = ({products}) => ({product: products.selectedProduct})

const ProductReviews = props => {
  const {product} = props
  return (
    <Item.Group>
      {product.reviews.map(review => <Review key={review.id} {...review} />)}
    </Item.Group>
  )
}

export default connect(mapState)(ProductReviews)
