import React from 'react'
import {Dropdown} from 'semantic-ui-react'

const statusArr = ['Created', 'Processing', 'Cancelled', 'Completed']

const OrderStatusUpdate = () => {
  return (
    <Dropdown placeholder="Order Status" search selection options={statusArr} />
  )
}

export default OrderStatusUpdate
