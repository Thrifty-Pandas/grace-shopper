import React, {Component} from 'react'
import {Header, Icon, List, Grid, Table, TableRow} from 'semantic-ui-react'
const SingleOrder = props => {
  const {order} = props

  return (
    <Table.Body>
      {order.products.map(product => {
        return (
          <Table.Row>
            <Table.Cell>{order.id}</Table.Cell>
            <Table.Cell>{product.name}</Table.Cell>
            <Table.Cell>{product.price}</Table.Cell>
          </Table.Row>
        )
      })}
      <Table.Row>
        <Table.Cell />

        <Table.Cell textAlign="right">
          <Icon name="money bill alternate" />
          Total
        </Table.Cell>
        <Table.Cell>${order.price}</Table.Cell>
      </Table.Row>
    </Table.Body>
  )
}

export default SingleOrder
