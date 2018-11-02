import React from 'react'
import {Table, Link, Image, Button} from 'semantic-ui-react'

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
          {this.props.cart.forEach(product => {
            return (
              <Table.Row>
                <Table.Cell>
                  <Link to={`/products/${id}`}>
                    <Image src={imageUrl} size="small" verticalAlign="middle" />
                    <br />
                    <h2>{name}</h2>
                  </Link>
                </Table.Cell>
                <Table.Cell>{price}</Table.Cell>
                <Table.Cell>{quantity}</Table.Cell>
                <Table.Cell>
                  <Button>Update quantity</Button>
                  <br />
                  <Button>Delete</Button>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    )
  }
}

export default UserCart
