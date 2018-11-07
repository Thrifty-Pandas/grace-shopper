import React from 'react'
import {editOneOrder} from '../store'
import {connect} from 'react-redux'
import {Form} from 'semantic-ui-react'

const statusArr = ['Created', 'Processing', 'Cancelled', 'Completed']

class OrderStatusUpdate extends React.Component {
  constructor() {
    super()
    this.state = {selectedStatus: []}
  }

  handleUpdate = e => {
    this.setState({
      selectedStatus: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.editOrderStatus(this.props.id, this.state.selectedStatus)
  }
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Field control="select" onChange={this.handleUpdate}>
            <option value="Created">Created</option>
            <option value="Processing">Processing</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Completed">Completed</option>
          </Form.Field>
        </Form.Group>
        <Form.Field control="button">Update Status</Form.Field>
      </Form>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    editOrderStatus: (id, status) => {
      dispatch(editOneOrder(id, status))
    }
  }
}

export default connect(null, mapDispatch)(OrderStatusUpdate)
