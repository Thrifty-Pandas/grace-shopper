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
    }
  }

  componentDidMount() {
    const {name, description, stock, price} = this.props.product
    this.setState({name, description, stock, price})
  }

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
      imageUrl: ''
    })
  }

  render() {
    return (
      <ProductForm
        {...this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        type="Edit"
      />
    )
  }
}

const mapStateToProps = ({products}) => ({product: products.selectedProduct})

const mapDispatchToProps = {editOneProduct}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct)
