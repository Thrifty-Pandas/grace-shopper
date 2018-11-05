import React from 'react'
import {connect} from 'react-redux'
import {addNewProduct} from '../store/products'
import {ProductForm} from './index'

const AddProduct = props => {
  return <ProductForm action={props.addNewProduct} verb="Add" />
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

const mapDispatchToProps = {addNewProduct}

export default connect(null, mapDispatchToProps)(AddProduct)
