import React from 'react'
import {OrderCard} from './index'
import {Grid} from 'semantic-ui-react'

const OrdersGrid = props => {
  const allOrders = props.ordersToDisplay

  return (
    <Grid columns={3}>
      {allOrders.map(order => (
        <Grid.Column key={order.id}>
          <OrderCard {...order} />
        </Grid.Column>
      ))}
    </Grid>
  )
}
export default OrdersGrid
