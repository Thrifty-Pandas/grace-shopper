import React from 'react'
import {Card, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

const OrderCard = props => {
  const {id, createdAt, status} = props

  return (
    <div>
      <Card
        header={`Order ID: ${id}`}
        meta={`Order placed: ${createdAt}`}
        description={`Status: ${status}`}
      />
      <Link to={`/orders/${id}`}>
        <Button>View Details</Button>
      </Link>
    </div>
  )
}
export default OrderCard
