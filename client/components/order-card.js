import React from 'react'
import {Card, Icon, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
const OrderCard = props => {
  const {id, createdAt, status} = props
  return (
    <div>
      <Card
        size="large"
        header={`Order ID: ${id}`}
        meta={`Order placed: ${createdAt}`}
        description={`Status: ${status}`}
      />
      <Link to={`/orders/${id}`}>
        <Button>
          <Icon name="order" />
          View Details
        </Button>
      </Link>
    </div>
  )
}
export default OrderCard
