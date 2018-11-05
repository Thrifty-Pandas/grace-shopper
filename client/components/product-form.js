import React from 'react'
import {Form, Input} from 'semantic-ui-react'

const ProductForm = props => {
  const {
    handleChange,
    handleSubmit,
    name,
    description,
    stock,
    price,
    imageUrl,
    type
  } = props
  return (
    <Form onSubmit={handleSubmit} size="big">
      <Form.Group>
        <Form.Field
          label="Product Name"
          control={Input}
          placeholder="Product Name"
          name="name"
          value={name}
          onChange={handleChange}
        />
        <Form.Field
          label="Description"
          control={Input}
          placeholder="Description"
          name="description"
          value={description}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Field
          label="Stock"
          control={Input}
          placeholder="Stock"
          name="stock"
          value={stock}
          onChange={handleChange}
        />
        <Form.Field
          label="Price"
          control={Input}
          placeholder="Price"
          name="price"
          value={price}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Field
          label="Image URL"
          control={Input}
          placeholder="Image URL"
          name="imageUrl"
          value={imageUrl}
          onChange={handleChange}
        />
        <Form.Button type="submit">{type} Product</Form.Button>
      </Form.Group>
    </Form>
  )
}

export default ProductForm
