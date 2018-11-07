import React from 'react'
import {Header, Rating, Segment, Divider} from 'semantic-ui-react'

const Review = props => {
  const {title, text, user, rating} = props
  return (
    <React.Fragment>
      <Header as="h4">{title}</Header>
      <div>
        <Rating icon="star" defaultRating={rating} maxRating={5} disabled />
      </div>
      {text}
    </React.Fragment>
  )
}

export default Review
