import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchOrders} from '../store'
import {OrdersGrid, OrderFilterForm} from './index'
import {Header, Button, Icon, Grid, GridRow, Image} from 'semantic-ui-react'

const mapStateToProps = ({orders, orderfilter}) => ({
  allOrders: orders.allOrders,
  orderfilter
})

const mapDispatchToProps = dispatch => ({
  fetchAllOrders: () => dispatch(fetchOrders())
})

const filterOrders = (allOrders, statusFilter) => {
  if (statusFilter.length) {
    return allOrders.filter(order => statusFilter.includes(order.status))
  } else {
    return allOrders
  }
}

class AllOrders extends Component {
  componentDidMount() {
    this.props.fetchAllOrders()
  }

  render() {
    const {allOrders, orderfilter} = this.props
    const ordersToDisplay = filterOrders(allOrders, orderfilter)
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Header as="h2" icon textAlign="center">
              <Image
                src="http://www.stickpng.com/assets/images/580b57fcd9996e24bc43c39a.png"
                circular
              />
              <Header.Content> Orders</Header.Content>
            </Header>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={3} stretched>
              <OrderFilterForm />
            </Grid.Column>
            <Grid.Column width={13}>
              <OrdersGrid ordersToDisplay={ordersToDisplay} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllOrders)
