import React from 'react'
import {Item, Rating} from 'semantic-ui-react'

const Review = props => {
  const {id, title, text, user, rating} = props
  return (
    <Item key={id} header={title} description={text} meta={user.firstName}>
      <Rating icon="star" defaultRating={rating} maxRating={5} disabled />
    </Item>
  )
}

export default Review
