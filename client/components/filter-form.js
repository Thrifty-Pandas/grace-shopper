import React, {Component} from 'react'
import {fetchCategories, setFilters} from '../store'
import {Button, Icon, Form, Checkbox, Menu} from 'semantic-ui-react'
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
        <Menu text vertical>
          <Menu.Item header>Categories</Menu.Item>
          {categories.map(category => (
            <Menu.Item key={category.id}>
              <Checkbox
                id={category.id}
                control="input"
                name="category"
                label={category.name}
                value={category.id}
                onChange={this.handleUpdate}
              />
            </Menu.Item>
          ))}

          <Menu.Item>
            <Button color="teal" type="submit">
              <Icon name="filter" />
              Apply Filter
            </Button>
          </Menu.Item>
        </Menu>
      </Form>
    )
  }
}

export default connect(mapState, mapDispatch)(FilterForm)
