import axios from 'axios'
const initialState = {allOrders: [], selectedOrder: {}}
export const GET_ORDERS = 'GET_ORDERS'
export const GET_ONEORDER = 'GET_ONEORDER'
export const ADD_ORDER = 'ADD_ORDER'
export const EDIT_ORDER = 'EDIT_ORDER'
export const getOrders = orders => ({
  type: GET_ORDERS,
  orders
})
export const getOneOrder = order => ({
  type: GET_ONEORDER,
  order
})
export const addOrder = order => ({
  type: ADD_ORDER,
  order
})
export const editOrder = order => ({
  type: EDIT_ORDER,
  order
})
export const fetchOrders = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/orders')
    dispatch(getOrders(data))
  } catch (err) {
    console.error(err)
  }
}
export const fetchOneOrder = orderId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/${orderId}`)
    dispatch(getOneOrder(data))
  } catch (err) {
    console.error(err)
  }
}
export const addNewOrder = order => async dispatch => {
  try {
    const {data} = await axios.post(`/api/orders`, order)
    dispatch(addOrder(data))
  } catch (err) {
    console.error(err)
  }
}
export const editOneOrder = (id, order) => async dispatch => {
  try {
    const {data} = await axios.put(`api/products/${id}`, order)
    dispatch(editOrder(data))
  } catch (err) {
    console.error(err)
  }
}
export const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return {...state, allOrders: [...action.orders]}
    case GET_ONEORDER:
      return {...state, selectedOrder: action.order}
    case ADD_ORDER:
      return {...state, allOrders: [...state.allOrders, action.order]}
    case EDIT_ORDER:
      const objIndex = state.allOrders.findIndex(
        obj => obj.id === action.order.id
      )
      const newArr = [...state.allOrders]
      newArr[objIndex] = action.order
      return {...state, allOrders: newArr, selectedOrder: action.order}
    default:
      return state
  }
}
