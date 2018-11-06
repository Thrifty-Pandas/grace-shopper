import React, {Component} from 'react'
import {fetchOrders, setOrderFilters} from '../store'
import {Button, Icon, Form} from 'semantic-ui-react'
import {connect} from 'react-redux'

const mapDispatch = {fetchOrders, setOrderFilters}

const statusArr = ['Created', 'Processing', 'Cancelled', 'Completed']

export class OrderFilterForm extends Component {
  constructor() {
    super()
    this.state = {filterSelection: []}
  }

  handleUpdate = e => {
    if (this.state.filterSelection.includes(e.target.value)) {
      this.setState({
        filterSelection: this.state.filterSelection.filter(
          status => status !== e.target.value
        )
      })
    } else {
      this.setState({
        filterSelection: [...this.state.filterSelection, e.target.value]
      })
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.setOrderFilters(this.state.filterSelection)
  }

  componentDidMount() {
    this.props.fetchOrders()
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group grouped>
          <label>Status</label>
          {statusArr.map(status => (
            <Form.Field
              type="checkbox"
              control="input"
              key={status}
              name="status"
              label={status}
              value={status}
              onChange={this.handleUpdate}
            />
          ))}
        </Form.Group>

        <Button type="submit">
          <Icon name="filter" />
          Apply Filter
        </Button>
      </Form>
    )
  }
}

export default connect(null, mapDispatch)(OrderFilterForm)
