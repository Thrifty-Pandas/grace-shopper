import axios from 'axios'

export const ADD_TO_CART = 'ADD_TO_CART'

export const addProduct = productInCart => ({
  type: ADD_TO_CART,
  productInCart
})

export const addToCartThunk = (productId, quantity) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/products/${productId}`, {quantity})
    dispatch(addProduct(data))
  } catch (err) {
    console.error(err)
  }
}

export const cartReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return [...state, action.productInCart]
    default:
      return state
  }
}
