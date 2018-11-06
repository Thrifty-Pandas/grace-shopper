import React, {Component} from 'react'
import {Form, Icon} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {addNewOrder} from '../store'

const mapState = ({cart, user}) => ({cart, user})
const mapDispatch = {addNewOrder}

export class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      shippingAddress: ''
    }
  }

  handleChange = evt => this.setState({[evt.target.name]: evt.target.value})

  handleSubmit = evt => {
    evt.preventDefault()
    const {shippingAddress, email} = this.state
    const {addNewOrder, cart, user} = this.props
    const {userId} = user
    const {cartId} = cart
    const price = 5 //hard coding for now since I don't have access to this data
    const order = {shippingAddress, email, userId, cartId}
    addNewOrder(order)
    //clear cart upon success
    //redirect to success page
  }

  render() {
    const {email, shippingAddress} = this.state
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>Email</label>

          <input value={email} onChange={this.handleChange} />
        </Form.Field>
        <Form.Field>
          <label>Shipping Address</label>
          <input value={shippingAddress} onChange={this.handleChange} />
        </Form.Field>
        <Form.Button type="submit">Complete Order</Form.Button>
      </Form>
    )
  }
}

export default connect(mapState, mapDispatch)(CheckoutForm)
