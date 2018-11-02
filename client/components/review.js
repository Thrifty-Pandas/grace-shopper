import React from 'react'
import {Item, Rating, Container} from 'semantic-ui-react'

const Review = props => {
  const {title, text, user, stars} = props
  return (
    <Item>
      <Item.Content>
        <Item.Header>{title}</Item.Header>
        <Item.Description>{text}</Item.Description>
      </Item.Content>
      <Rating icon="star" defaultRating={stars} maxRating={5} disabled />
    </Item>
  )
}

export default Review
