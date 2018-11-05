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
      price: '',
      imageUrl: ''
      // productCategories: []
    }
  }

  // handleCategoryChange = evt => {
  //   const categoryId = Number(evt.target.id)
  //   if (this.state.productCategories.includes(categoryId)) {
  //     this.setState({
  //       productCategories: this.state.productCategories.filter(
  //         id => id !== categoryId
  //       )
  //     })
  //   } else {
  //     this.setState({
  //       productCategories: [...this.state.productCategories, categoryId]
  //     })
  //   }
  // }

  handleChange = evt => this.setState({[evt.target.name]: evt.target.value})

  handleSubmit = evt => {
    evt.preventDefault()
    const {name, description, stock, price, imageUrl} = this.state
    const product = {name, description, stock, price, imageUrl}

    this.props.addNewProduct(product)

    this.setState({
      name: '',
      description: '',
      stock: null,
      price: null,
      imageUrl: ''
      // productCategories: []
    })
  }

  render() {
    return (
      <ProductForm
        {...this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        // handleCategoryChange={this.handleCategoryChange}
        type="Add"
      />
    )
  }
}

const mapDispatchToProps = {addNewProduct}

export default connect(null, mapDispatchToProps)(AddProduct)
