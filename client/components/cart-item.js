import React from 'react'
import {Table, Link, Button, Image} from 'semantic-ui-react'

const CartItem = props => {
  console.log('product: ', props.productInfo)
  console.log('cart product: ', props.cartInfo)
  const {quantity} = props.cartInfo
  const {id, price, imageUrl, name} = props.productInfo
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
      <td>button goes here</td>
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

export default CartItem
