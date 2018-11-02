import axios from 'axios'

export const GET_CART = 'GET_CART'
export const ADD_TO_CART = 'ADD_TO_CART'
export const EDIT_PRODUCT = 'EDIT_PRODUCT'

export const getCartItems = productsInCart => ({
  type: GET_CART,
  productsInCart
})

export const addProduct = productInCart => ({
  type: ADD_TO_CART,
  productInCart
})

export const editProduct = productInCart => ({
  type: EDIT_PRODUCT,
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

export const editProductInCart = (productId, quantity) => async dispatch => {
  try {
    const {data} = await axios.put(`api/cart/${productId}`, {
      quantity: quantity
    })
    dispatch(editProduct(data))
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
    case EDIT_PRODUCT:
      const objIndex = state.findIndex(
        obj => obj.id === action.productInCart.id
      )
      const newArr = [...state]
      newArr[objIndex] = action.productInCart
      return newArr
    default:
      return state
  }
}
