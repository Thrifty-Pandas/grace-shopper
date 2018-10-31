import axios from 'axios'

const initialState = {allProducts: [], selectedProduct: {}}

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

export const addProduct = product => ({
  type: ADD_PRODUCT,
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

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {...state, allProducts: [...action.products]}
    case GET_ONEPRODUCT:
      return {...state, selectedProduct: action.product}
    case ADD_PRODUCT:
      return {...state, allProducts: [...state.allProducts, action.product]}
    default:
      return state
  }
}
