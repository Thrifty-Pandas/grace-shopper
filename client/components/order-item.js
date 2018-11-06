import React from 'react'
import {Image} from 'semantic-ui-react'

const OrderItem = props => {
  const {quantity} = props.cartInfo
  const {id, price, imageUrl, name} = props.productInfo

  return (
    <tr>
      <td>
        <a href={`/products/${id}`}>
          <Image src={imageUrl} size="small" verticalAlign="middle" /> <br />{' '}
          {name}
        </a>
      </td>
      <td>${price}.00</td>
      <td>{quantity} pcs</td>
      <td>${price * quantity}.00</td>
    </tr>
  )
}

export default OrderItem
