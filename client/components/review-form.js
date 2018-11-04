import React, {Component} from 'react'
import {Rating, Form, Button, Icon} from 'semantic-ui-react'
import {postReview} from '../store'
import {connect} from 'react-redux'

const mapState = ({user, products}) => ({user, products})
const mapDispatch = {postReview}

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
    const {user, products} = this.props
    const userId = user.id
    const productId = products.selectedProduct.id
    postReview({title, text, rating, userId, productId})
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

export default connect(mapState, mapDispatch)(ReviewForm)
