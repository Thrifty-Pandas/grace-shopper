import React, {Component} from 'react'
import {Form} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {addNewProduct, editOneProduct} from '../store/products'

class ProductForm extends Component {
  state = {
    name: '',
    description: '',
    stock: 0,
    price: 0
  }

  componentDidMount() {
    if (this.props.product) {
      const {name, description, stock, price} = this.props.product
      this.setState({name, description, stock, price})
    }
  }

  handleChange = evt => this.setState({[evt.target.name]: evt.target.value})

  handleSubmit = evt => {
    evt.preventDefault()
    const {name, description, stock, price} = this.state
    const product = {name, description, stock, price}
    if (this.props.product) {
      this.props.editProduct(product)
    } else {
      this.props.newProduct(product)
    }
    this.setState({
      name: '',
      description: '',
      stock: 0,
      price: 0
    })
  }

  render() {
    const {name, description, stock, price} = this.state

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Input
            placeholder="Name"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
          <Form.Input
            placeholder="Description"
            name="description"
            value={description}
            onChange={this.handleChange}
          />
          <Form.Input
            placeholder="Stock"
            name="stock"
            value={stock}
            onChange={this.handleChange}
          />
          <Form.Input
            placeholder="Price"
            name="price"
            value={price}
            onChange={this.handleChange}
          />
          <Form.Button content="Submit" />
        </Form.Group>
      </Form>
    )
  }
}

const mapStateToProps = state => {
  return {
    product: state.products.selectedproduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    newProduct: product => {
      dispatch(addNewProduct(product))
    },
    editProduct: product => {
      dispatch(editOneProduct(product))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm)
