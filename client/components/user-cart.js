import React from 'react'
import {Table, Link, Image, Button} from 'semantic-ui-react'
import {CartItem} from './index'

class UserCart extends React.Component {
  state = {}

  render() {
    return (
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell singleLine>Product</Table.HeaderCell>
            <Table.HeaderCell singleLine>Price</Table.HeaderCell>
            <Table.HeaderCell singleLine>Quantity</Table.HeaderCell>
            <Table.HeaderCell singleLine>Update</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.props.cart.forEach(product => (
            <CartItem key={product.id} cartInfo={product} />
          ))}
        </Table.Body>
      </Table>
    )
  }
}

export default UserCart
