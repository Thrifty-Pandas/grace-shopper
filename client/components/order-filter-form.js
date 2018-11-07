import React, {Component} from 'react'
import {fetchOrders, setOrderFilters} from '../store'
import {Button, Icon, Form, Menu, Checkbox} from 'semantic-ui-react'
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
        <Menu text vertical>
          <Menu.Item header>Order Status</Menu.Item>
          {statusArr.map(status => (
            <Menu.Item key={status}>
              <Checkbox
                control="input"
                name="status"
                label={status}
                value={status}
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

export default connect(null, mapDispatch)(OrderFilterForm)
