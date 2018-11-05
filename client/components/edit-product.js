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

const mapStateToProps = ({products}) => ({product: products.selectedProduct})

const mapDispatchToProps = {editOneProduct}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct)
