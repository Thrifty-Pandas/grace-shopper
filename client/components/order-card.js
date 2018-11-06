import React from 'react'
import {Card, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {OrderStatusUpdate} from './index'

const OrderCard = props => {
  const {id, createdAt, status, totalPrice} = props

  return (
    <div>
      <Link to={`/orders/${id}`}>
        <Card
          header={`Order ID: ${id}`}
          meta={`Order placed: ${createdAt}`}
          description={`Status: ${status}`}
          extra={`Total: $${totalPrice}.00`}
        />
      </Link>
      <OrderStatusUpdate id={id} />
    </div>
  )
}
export default OrderCard
