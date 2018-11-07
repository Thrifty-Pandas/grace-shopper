import {Elements} from 'react-stripe-elements'
import React from 'react'
import {CheckoutForm} from '../components'

export const CheckoutPage = () => {
  return (
    <Elements>
      <CheckoutForm />
    </Elements>
  )
}

export default CheckoutPage
