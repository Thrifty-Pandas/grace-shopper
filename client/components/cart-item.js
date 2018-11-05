import React from 'react'
import {Table, Link, Button, Image, Input, Icon} from 'semantic-ui-react'
import {editProductInCart} from '../store/cart'
import {connect} from 'react-redux'

class CartItem extends React.Component {
  state = {
    quantity: 1
  }

  handleChange = evt => this.setState({[evt.target.name]: evt.target.value})

  render() {
    console.log('product: ', this.props.productInfo)
    console.log('cart product: ', this.props.cartInfo)
    const {quantity} = this.props.cartInfo
    const {id, price, imageUrl, name} = this.props.productInfo
    console.log('quantity: ', quantity)

    return (
      <tr>
        <td>
          <a href={`/products/${id}`}>
            <Image src={imageUrl} size="small" verticalAlign="middle" /> <br />{' '}
            {name}
          </a>
        </td>
        <td>${price}.00</td>
        <td>{quantity}</td>
        <td>
          <Input
            action={
              <Button
                onClick={() => {
                  this.props.editProductInCart(id, quantity)
                }}
              >
                <Icon name="cart" />
                Edit Quantity
              </Button>
            }
            type="number"
            name="quantity"
            placeholder="quantity"
            value={this.state.quantity}
            onChange={this.handleChange}
          />
        </td>
      </tr>
      // <Table.Row>
      //   <Table.Cell>
      //     <Link to={`/products/${id}`}>
      //       <Image src={imageUrl} size="small" verticalAlign="middle" />
      //       <br />
      //       <h2>{name}</h2>
      //     </Link>
      //   </Table.Cell>
      //   <Table.Cell>{price}</Table.Cell>
      //   <Table.Cell>{quantity}</Table.Cell>
      //   <Table.Cell>
      //     <Button>Update quantity</Button>
      //     <br />
      //     <Button>Delete</Button>
      //   </Table.Cell>
      // </Table.Row>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editProductInCart: (productId, quantity) => {
      dispatch(editProductInCart(productId, quantity))
    }
  }
}

export default connect(null, mapDispatchToProps)(CartItem)
