import axios from 'axios'

const initialOrders = []
export const SET_ORDERS = 'SET_ORDERS'

export const setOrders = orders => ({
  type: SET_ORDERS,
  orders
})

export const fetchOrders = () => async dispatch => {
  try {
    const {data} = await axios.get(`api/orders`)
    dispatch(setOrders(data))
  } catch (err) {
    console.error(err)
  }
}
export const fetchOrdersById = userId => async dispatch => {
  try {
    const {data} = await axios.get(`api/orders/${userId}`)
    dispatch(setOrders(data))
  } catch (err) {
    console.error(err)
  }
}

export const ordersReducer = (state = initialOrders, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return action.orders
    default:
      return state
  }
}
