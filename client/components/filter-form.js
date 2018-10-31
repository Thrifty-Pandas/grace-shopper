import React, {Component} from 'react'
import {fetchCategories, setFilters} from '../store'
import {Button, Icon} from 'semantic-ui-react'
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
      <form onSubmit={this.handleSubmit}>
        {categories.map(category => (
          <div key={category.id}>
            <input
              type="checkbox"
              id={category.id}
              name="category"
              value={category.id}
              onChange={this.handleUpdate}
            />
            <label>{category.name}</label>
          </div>
        ))}
        <Button>
          Apply Filter
          <Icon name="heart" />
        </Button>
      </form>
    )
  }
}

export default connect(mapState, mapDispatch)(FilterForm)
