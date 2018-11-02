import React from 'react'
import {Card, Icon, Button} from 'semantic-ui-react'

//expects an entire product object as props
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
      <Button>
        <Icon name="cart" />
        View Details
      </Button>
    </div>
  )
}

export default OrderCard
