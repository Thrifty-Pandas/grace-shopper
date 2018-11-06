import React from 'react'
import {Card, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const OrderCard = props => {
  const {id, createdAt, status} = props

  return (
    <div>
      <Link to={`/orders/${id}`}>
        <Card
          header={`Order ID: ${id}`}
          meta={`Order placed: ${createdAt}`}
          description={`Status: ${status}`}
        />
      </Link>
    </div>
  )
}
export default OrderCard
