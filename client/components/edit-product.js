import React from 'react'
import {connect} from 'react-redux'
import {editOneProduct} from '../store/products'
import {ProductForm} from './index'

const EditProduct = props => {
  const {product} = props
  if (!product.id) return <div />
  else
    return (
      <ProductForm action={props.editOneProduct} verb="Edit" {...product} />
    )
}

const mapStateToProps = ({products}) => ({product: products.selectedProduct})

const mapDispatchToProps = dispatch => ({
  editOneProduct: (id, product) => dispatch(editOneProduct(id, product))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct)
