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
    if (this.state.filterSelection.includes(e.target.id)) {
      this.setState({
        filterSelection: this.state.filterSelection.filter(
          id => id !== e.target.id
        )
      })
    } else {
      this.setState({
        filterSelection: [...this.state.filterSelection, e.target.id]
      })
    }
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.setFilters(this.state.filterSelection)
  }

  componentDidMount() {
    this.props.fetchCategories()
  }

  render() {
    const {categories} = this.props
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group grouped>
          <label>Categories</label>
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

        <Button>
          <Icon name="filter" />
          Apply Filter
        </Button>
      </Form>
    )
  }
}

export default connect(mapState, mapDispatch)(FilterForm)
