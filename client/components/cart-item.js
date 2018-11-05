import React from 'react'
import {Table, Link, Button} from 'semantic-ui-react'

class CartItem extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const {quantity} = this.props.cartInfo
    const {id, price, imageUrl, name} = this.props.productInfo
    return (
      <React.Fragment>
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
      </React.Fragment>
    )
  }
}

export default CartItem
