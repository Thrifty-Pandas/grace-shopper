import React, {Component} from 'react'
import {connect} from 'react-redux'
import {editOneProduct} from '../store/products'
import {ProductForm} from './index'

class EditProduct extends Component {
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

  componentDidMount() {
    const {
      name,
      description,
      stock,
      price
    } = this.props.products.selectedProduct
    // const productCategories = this.props.product.map(category => category.id)
    this.setState({name, description, stock, price})
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

    this.props.editProduct(product)

    this.setState({
      name: '',
      description: '',
      stock: '',
      price: '',
      imageUrl: '',
      productCategories: []
    })
  }

  render() {
    return (
      <ProductForm
        {...this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        // handleCategoryChange={this.handleCategoryChange}
        type="Edit"
      />
    )
  }
}

const mapStateToProps = ({products}) => ({products})

const mapDispatchToProps = {editOneProduct}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct)
