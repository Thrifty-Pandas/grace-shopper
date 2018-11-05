import React from 'react'
import {Table, Link, Button, Image, Input, Icon} from 'semantic-ui-react'
import {editProductInCart, deleteCartProductThunk} from '../store/cart'
import {connect} from 'react-redux'

class CartItem extends React.Component {
  state = {
    formQuantity: 1
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
                  this.props.editProductInCart(id, this.state.formQuantity)
                }}
              >
                <Icon name="cart" />
                Update Total Quantity
              </Button>
            }
            type="number"
            name="formQuantity"
            placeholder="quantity"
            value={this.state.formQuantity}
            onChange={this.handleChange}
          />
          <br />
          <Button
            type="submit"
            onClick={() => {
              this.props.deleteProductInCart(id)
            }}
          >
            Delete this item
          </Button>
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
    },
    deleteProductInCart: productId => {
      dispatch(deleteCartProductThunk(productId))
    }
  }
}

export default connect(null, mapDispatchToProps)(CartItem)
