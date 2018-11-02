import React, {Component} from 'react'
import {Rating, Form, Button, Icon} from 'semantic-ui-react'
import axios from 'axios'

export class ReviewForm extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      text: '',
      rating: 0
    }
  }
  handleChange = (e, {rating}) => {
    if (rating) {
      this.setState({rating})
    } else {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  }
  handleSubmit = e => {
    e.preventDefault()
    const {title, text, rating} = this.state
    axios.post('/api/reviews', {title, text, rating, userId: 1, productId: 1})
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Input
            label="Title"
            name="title"
            placeholder="My Product Review"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <Rating
            rating={this.state.rating}
            name="rating"
            value={this.state.rating}
            onRate={this.handleChange}
            maxRating={5}
          />
        </Form.Group>
        <Form.TextArea
          label="Text"
          name="text"
          value={this.state.text}
          placeholder="Tell us your thoughts about this product"
          onChange={this.handleChange}
        />
        <Form.Button type="submit">Submit Review</Form.Button>
      </Form>
    )
  }
}

export default ReviewForm
