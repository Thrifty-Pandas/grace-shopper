import axios from 'axios'

export const GET_CART = 'GET_CART'
export const ADD_TO_CART = 'ADD_TO_CART'

export const getCartItems = productsInCart => ({
  type: GET_CART,
  productsInCart
})

export const addProduct = productInCart => ({
  type: ADD_TO_CART,
  productInCart
})

export const getProductsInCartThunk = () => async dispatch => {
  try {
    const {data} = await axios.get(`api/cart`)
    dispatch(getCartItems(data))
  } catch (err) {
    console.error(err)
  }
}

export const addToCartThunk = (productId, quantity) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/cart/${productId}`, {
      quantity: quantity
    })
    dispatch(addProduct(data))
  } catch (err) {
    console.error(err)
  }
}

export const cartReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CART:
      return [...action.productsInCart]
    case ADD_TO_CART:
      return [...state, action.productInCart]
    default:
      return state
  }
}
