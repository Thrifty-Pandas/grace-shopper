import React, {Component} from 'react'
import {Form, Icon, Button, Container, Divider, Header} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {addNewOrder} from '../store'
import {
  CardElement,
  injectStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement
} from 'react-stripe-elements'
import {SuccessPage} from '../components'
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
    const {status, data} = await axios.post('/api/charge', {token})

    if (status === 200) this.setState({complete: true})
  }

  handleForm = evt => {
    evt.preventDefault()

    const {shippingAddress, email} = this.state
    const {addNewOrder, cart, user} = this.props
    const {id} = user
    const {cartId} = cart[0]
    const totalPrice = 5 //hard coding for now since I don't have access to this data
    const order = {shippingAddress, email, userId: id, totalPrice, cartId}
    addNewOrder(order)
    //clear cart upon success
    //redirect to success page
  }

  handleSubmit = async evt => {
    await this.handleStripe(evt)
    this.handleForm(evt)
  }

  render() {
    if (this.state.complete) return <SuccessPage />
    const {email, shippingAddress} = this.state
    return (
      <Container>
        <Form>
          <Form.Group>
            <Form.Field>
              <label>Email</label>
              <input value={email} onChange={this.handleChange} name="email" />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field>
              <label>Shipping Address</label>
              <input
                value={shippingAddress}
                onChange={this.handleChange}
                name="shippingAddress"
              />
            </Form.Field>
          </Form.Group>
        </Form>
        <Container>
          {/* <CardElement /> */}
          <Container>
            <Header as="h5">Card Number</Header>
            <CardNumberElement />
          </Container>
          <Container>
            <Header as="h5">Expiration Date</Header>
            <CardExpiryElement />
          </Container>
          <Container>
            <Header as="h5">CVC</Header>
            <CardCVCElement />
          </Container>
          <Container>
            <Header as="h5">Billing ZIP Code</Header>
            <PostalCodeElement />
          </Container>
        </Container>
        <Divider />
        <Button type="button" onClick={this.handleSubmit}>
          <Icon name="credit card outline" />
          Complete Purchase
        </Button>
      </Container>
    )
  }
}

export default injectStripe(connect(mapState, mapDispatch)(CheckoutForm))
