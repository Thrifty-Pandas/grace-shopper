import React from 'react'
import {StripeProvider} from 'react-stripe-elements'
import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <StripeProvider apiKey="pk_test_TYooMQauvdEDq54NiTphI7jx">
      <div>
        <Navbar />
        <Routes />
      </div>
    </StripeProvider>
  )
}

export default App
