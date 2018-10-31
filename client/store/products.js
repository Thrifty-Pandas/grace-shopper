import axios from 'axios'

const initialState = []

export const GET_PRODUCTS = 'GET_PRODUCTS'
export const GET_ONEPRODUCT = 'GET_ONEPRODUCT'
export const ADD_PRODUCT = 'ADD_PRODUCT'

export const getProducts = products => ({
  type: GET_PRODUCTS,
  products
})

export const getOneProduct = product => ({
  type: GET_ONEPRODUCT,
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

export const fetchOneProduct = product => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${product.id}`)
    dispatch(getOneProduct(data))
  } catch (err) {
    console.error(err)
  }
}

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    case GET_ONEPRODUCT:
      return action.product
    default:
      return state
  }
}
