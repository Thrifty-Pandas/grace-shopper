import React, {Component} from 'react'
import {fetchCategories, setFilters} from '../store'
import {Button, Icon, Form} from 'semantic-ui-react'
import {connect} from 'react-redux'

const mapState = ({categories}) => ({categories})

const mapDispatch = {fetchCategories, setFilters}

export class FilterForm extends Component {
  constructor() {
    super()
    this.state = {filterSelection: []}
  }

  handleUpdate = e => {
    const categoryId = Number(e.target.id)
    if (this.state.filterSelection.includes(categoryId)) {
      this.setState({
        filterSelection: this.state.filterSelection.filter(
          id => id !== categoryId
        )
      })
    } else {
      this.setState({
        filterSelection: [...this.state.filterSelection, categoryId]
      })
    }
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.setFilters(this.state.filterSelection)
  }

  render() {
    const {categories} = this.props
    return (
      <Form onSubmit={this.handleSubmit}>
        <label htmlFor="">Categories</label>
        <Form.Group grouped>
          {categories.map(category => (
            <Form.Field
              type="checkbox"
              id={category.id}
              key={category.id}
              control="input"
              name="category"
              label={category.name}
              value={category.id}
              onChange={this.handleUpdate}
            />
          ))}
        </Form.Group>

        <Button color="teal" type="submit">
          <Icon name="filter" />
          Apply Filter
        </Button>
      </Form>
    )
  }
}

export default connect(mapState, mapDispatch)(FilterForm)
