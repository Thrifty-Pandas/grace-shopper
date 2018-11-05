import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addNewProduct} from '../store/products'
import {ProductForm} from './index'

class AddProduct extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      description: '',
      stock: '',
      price: ''
    }
  }

  handleChange = evt => this.setState({[evt.target.name]: evt.target.value})

  handleSubmit = evt => {
    evt.preventDefault()
    const {name, description, stock, price, imageUrl} = this.state
    const product = {name, description, stock, price, imageUrl}

    this.props.addNewProduct(product)

    this.setState({
      name: '',
      description: '',
      stock: '',
      price: '',
      imageUrl: ''
    })
  }

  render() {
    return (
      <ProductForm
        {...this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        type="Add"
      />
    )
  }
}

const mapDispatchToProps = {addNewProduct}

export default connect(null, mapDispatchToProps)(AddProduct)
