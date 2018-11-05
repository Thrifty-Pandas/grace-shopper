import React, {Component} from 'react'
import {Form, Input, Icon} from 'semantic-ui-react'
import {connect} from 'react-redux'

//even though we might have this in an entirely separate page,to me it
//makes sense to restrict access at the component level to have the
//extra guarantee
const mapState = ({user, categories}) => ({user, categories})

export class ProductForm extends Component {
  constructor(props) {
    super(props)
    const name = props.name ? props.name : ''
    const description = props.description ? props.description : ''
    const stock = props.stock ? props.stock : ''
    const price = props.price ? props.price : ''
    const productCategories = props.categories
      ? props.categories.map(category => category.id)
      : ''

    this.state = {
      name,
      description,
      stock,
      price,
      imageUrl: '',
      productCategories
    }
  }

  handleChange = evt => this.setState({[evt.target.name]: evt.target.value})

  handleCategoryChange = evt => {
    const categoryId = Number(evt.target.id)
    if (this.state.productCategories.includes(categoryId)) {
      this.setState({
        productCategories: this.state.productCategories.filter(
          id => id !== categoryId
        )
      })
    } else {
      this.setState({
        productCategories: [...this.state.productCategories, categoryId]
      })
    }
  }

  handleSubmit = evt => {
    evt.preventDefault()
    const {name, description, stock, price, imageUrl} = this.state
    const product = {name, description, stock, price, imageUrl}

    this.props.action(product)

    this.setState({
      name: '',
      description: '',
      stock: '',
      price: '',
      imageUrl: ''
      // productCategories: []
    })
  }

  render() {
    const {name, description, stock, price, imageUrl} = this.state
    const {verb, categories} = this.props
    return (
      <Form onSubmit={this.handleSubmit} size="big">
        <Form.Group>
          <Form.Field>
            <label>Product Name</label>
            <Input
              type="text"
              placeholder="Product Name"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <Input
              type="text"
              placeholder="Description"
              name="description"
              value={description}
              onChange={this.handleChange}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group>
          <Form.Field>
            <label>Stock</label>
            <Input
              type="number"
              placeholder="Stock"
              name="stock"
              value={stock}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Price</label>
            <Input
              type="number"
              placeholder="Price"
              name="price"
              value={price}
              onChange={this.handleChange}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group>
          <Form.Field>
            <label>Image URL</label>
            <Input
              type="text"
              placeholder="Image URL"
              name="imageUrl"
              value={imageUrl}
              onChange={this.handleChange}
            />
          </Form.Field>

          <label htmlFor="">Categories</label>
          <Form.Group>
            {categories.length &&
              categories.map(category => (
                <Form.Field
                  type="checkbox"
                  id={category.id}
                  key={category.id}
                  control="input"
                  name="category"
                  label={category.name}
                  value={category.id}
                  onChange={this.handleCategoryChange}
                />
              ))}
          </Form.Group>
          <Form.Button type="submit">
            <Icon name={verb.toLowerCase()} /> {verb} Product
          </Form.Button>
        </Form.Group>
      </Form>
    )
  }
}

export default connect(mapState)(ProductForm)
