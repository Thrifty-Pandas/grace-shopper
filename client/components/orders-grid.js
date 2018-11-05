import React from 'react'
import {OrderCard} from './index'
import {Grid} from 'semantic-ui-react'
const OrdersGrid = props => {
  const {orders} = props
  return (
    <Grid>
      {orders.map(order => (
        <Grid.Column key={order.id} width={1}>
          <OrderCard {...order} />
        </Grid.Column>
      ))}
    </Grid>
  )
}
export default OrdersGrid
