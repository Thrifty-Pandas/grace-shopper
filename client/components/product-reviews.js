import React from 'react'
import {connect} from 'react-redux'
import {Header, Grid} from 'semantic-ui-react'
import {Review} from './index'

//renders the reviews from the store (for the selected product)

const mapState = ({reviews}) => ({reviews})

const ProductReviews = props => {
  const {reviews} = props
  if (reviews.length === 0) {
    return <div />
  } else {
    return (
      <Grid columns={3} divided>
        <Header as="h3">Customer Reviews</Header>
        <Grid.Row stretched>
          {reviews &&
            reviews.map(review => (
              <Grid.Column key={review.id}>
                <Review {...review} />
              </Grid.Column>
            ))}
        </Grid.Row>
      </Grid>
    )
  }
}

export default connect(mapState)(ProductReviews)
