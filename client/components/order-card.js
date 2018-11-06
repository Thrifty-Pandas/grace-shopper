import React from 'react'
import {connect} from 'react-redux'
import {Card} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {OrderStatusUpdate} from './index'

class OrderCard extends React.Component {
  state = {}

  render() {
    const {id, createdAt, status, totalPrice} = this.props
    if (this.props.user.isAdmin) {
      const statusUpdate = <OrderStatusUpdate id={id} />
    }

    return (
      <div>
        <Link to={`/orders/${id}`}>
          <Card
            header={`Order ID: ${id}`}
            meta={`Order placed: ${createdAt}`}
            description={`Status: ${status}`}
            extra={`Total: $${totalPrice}.00`}
          />
          {statusUpdate}
        </Link>
      </div>
    )
  }
}

const mapState = ({user}) => ({user})

export default connect(mapState)(OrderCard)
