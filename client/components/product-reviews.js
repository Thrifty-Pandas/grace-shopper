import React from 'react'
import {connect} from 'react-redux'
import {Item} from 'semantic-ui-react'
import {Review} from './index'

//renders the reviews from the store (for the selected product)

const mapState = ({reviews}) => ({reviews})

const ProductReviews = props => {
  const {reviews} = props
  return (
    <Item.Group>
      {reviews && reviews.map(review => <Review key={review.id} {...review} />)}
    </Item.Group>
  )
}

export default connect(mapState)(ProductReviews)
