import axios from 'axios'
import {getReviews} from './reviews'

const initialState = {allProducts: [], selectedProduct: {}}

export const GET_PRODUCTS = 'GET_PRODUCTS'
export const GET_ONEPRODUCT = 'GET_ONEPRODUCT'
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const EDIT_PRODUCT = 'EDIT_PRODUCT'

export const getProducts = products => ({
  type: GET_PRODUCTS,
  products
})

export const getOneProduct = product => ({
  type: GET_ONEPRODUCT,
  product
})

export const addProduct = product => ({
  type: ADD_PRODUCT,
  product
})

export const editProduct = product => ({
  type: EDIT_PRODUCT,
  product
})

export const fetchProducts = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products')
    dispatch(getProducts(data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchOneProduct = productId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${productId}`)
    dispatch(getOneProduct(data))
    dispatch(getReviews(data.reviews))
  } catch (err) {
    console.error(err)
  }
}

export const addNewProduct = product => async dispatch => {
  try {
    const {data} = await axios.post(`api/products`, product)
    dispatch(addProduct(data))
  } catch (err) {
    console.error(err)
  }
}

export const editOneProduct = (id, product) => async dispatch => {
  try {
    const {data} = await axios.put(`api/products/${id}`, product)
    dispatch(editProduct(data))
  } catch (err) {
    console.error(err)
  }
}

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {...state, allProducts: [...action.products]}
    case GET_ONEPRODUCT:
      return {...state, selectedProduct: action.product}
    case ADD_PRODUCT:
      return {...state, allProducts: [...state.allProducts, action.product]}
    case EDIT_PRODUCT:
      const objIndex = state.allProducts.findIndex(
        obj => obj.id === action.product.id
      )
      const newArr = [...state.allProducts]
      newArr[objIndex] = action.product
      return {...state, allProducts: newArr, selectedProduct: action.product}
    default:
      return state
  }
}
