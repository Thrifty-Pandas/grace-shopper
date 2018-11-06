import React, {Component} from 'react'
import {Form, Icon, Button, Container, Divider} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {addNewOrder} from '../store'
import {CardElement, injectStripe} from 'react-stripe-elements'
import axios from 'axios'

const mapState = ({cart, user}) => ({cart, user})
const mapDispatch = {addNewOrder}

export class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      shippingAddress: '',
      complete: false
    }
  }

  handleChange = evt => this.setState({[evt.target.name]: evt.target.value})

  handleStripe = async () => {
    let {token} = await this.props.stripe.createToken({name: 'Name'})
    // let res = await axios.post('api/charge', { token.id})
    const {data} = await axios.post('/api/charge', {token})
    // let response = await fetch('/api/charge', {
    //   method: 'POST',
    //   headers: {'Content-Type': 'text/plain'},
    //   body: token.id
    // })

    // if (response.ok) this.setState({complete: true})
  }

  handleForm = evt => {
    evt.preventDefault()

    const {shippingAddress, email} = this.state
    const {addNewOrder, cart, user} = this.props
    const {userId} = user
    const {cartId} = cart[0]
    const totalPrice = 5 //hard coding for now since I don't have access to this data
    const order = {shippingAddress, email, userId, cartId, totalPrice}
    addNewOrder(order)
    //clear cart upon success
    //redirect to success page
  }

  handleSubmit = async evt => {
    await this.handleStripe(evt)
    this.handleForm(evt)
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>
    const {email, shippingAddress} = this.state
    return (
      <Container>
        <Form>
          <Form.Field>
            <label>Email</label>
            <input value={email} onChange={this.handleChange} name="email" />
          </Form.Field>
          <Form.Field>
            <label>Shipping Address</label>
            <input
              value={shippingAddress}
              onChange={this.handleChange}
              name="shippingAddress"
            />
          </Form.Field>
          <Button type="submit" onClick={this.handleSubmit}>
            <Icon name="credit card outline" />
            Complete Purchase
          </Button>
        </Form>
        <Container>
          <CardElement />
        </Container>
        <Divider />
      </Container>
    )
  }
}

export default injectStripe(connect(mapState, mapDispatch)(CheckoutForm))
