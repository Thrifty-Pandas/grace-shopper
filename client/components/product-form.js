import React from 'react'
import {Form, Input, Icon} from 'semantic-ui-react'
import {connect} from 'react-redux'

//even though we might have this in an entirely separate page,to me it
//makes sense to restrict access at the component level to have the
//extra guarantee
const mapState = ({user, categories}) => ({user, categories})

const ProductForm = props => {
  const {
    handleChange,
    handleCategoryChange,
    handleSubmit,
    name,
    description,
    categories,
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
        <label htmlFor="">Categories</label>
        <Form.Group>
          {categories.map(category => (
            <Form.Field
              type="checkbox"
              id={category.id}
              key={category.id}
              control="input"
              name="category"
              label={category.name}
              value={category.id}
              onChange={handleCategoryChange}
            />
          ))}
        </Form.Group>
        <Form.Button type="submit">
          <Icon name={type.toLowerCase()} /> {type} Product
        </Form.Button>
      </Form.Group>
    </Form>
  )
}

export default connect(mapState)(ProductForm)
