export const GET_PRODUCTS = 'GET_PRODUCTS'
export const ADD_PRODUCT = 'ADD_PRODUCT'
import axios from 'axios'

const initialState = []

export const getProducts = products => ({
  type: GET_PRODUCTS,
  products
})

export const fetchProducts = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products')
    dispatch(getProducts(data))
  } catch (err) {
    console.error(err)
  }
}

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    default:
      return state
  }
}
