import React, {Component} from 'react'
import {Form, Input, Icon} from 'semantic-ui-react'
import {postCategory} from '../store'
import {connect} from 'react-redux'

const mapDispatch = {postCategory}

//even though we might have this in an entirely separate page,to me it
//makes sense to restrict access at the component level to have the
//extra guarantee
const mapState = ({user}) => ({user})

export class AddCategoryForm extends Component {
  constructor() {
    super()
    this.state = {
      name: ''
    }
  }
  handleChange = evt => this.setState({[evt.target.name]: evt.target.value})

  handleSubmit = evt => {
    evt.preventDefault()
    const {name} = this.state
    this.props.postCategory({name})
    this.setState({
      name: ''
    })
  }

  render() {
    return (
      this.props.user.isAdmin && (
        <Form onSubmit={this.handleSubmit} size="big">
          <Form.Group>
            <Form.Field
              label="Category Name"
              control={Input}
              placeholder="Category Name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Button>
            <Icon name="add" />
            Add Category
          </Form.Button>
        </Form>
      )
    )
  }
}

export default connect(mapState, mapDispatch)(AddCategoryForm)
