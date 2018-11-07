import axios from 'axios'

const allUsers = []

const ADD_USERS = 'ADD_USERS'

export const setUsers = users => {
  return {
    type: ADD_USERS,
    users
  }
}
export const getAllUsers = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/users')
    dispatch(setUsers(data))
  } catch (err) {
    console.error(err)
  }
}
export const deleteUser = userId => async dispatch => {
  try {
    await axios.delete(`/api/users/${userId}`)
    const {data} = await axios.get('/api/users')
    dispatch(setUsers(data))
  } catch (err) {
    console.error(err)
  }
}
export const updateToAdmin = userId => async dispatch => {
  try {
    await axios.put(`/api/users/${userId}`)
    const {data} = await axios.get('/api/users')
    dispatch(setUsers(data))
  } catch (err) {
    console.error(err)
  }
}
export const usersReducer = (state = allUsers, action) => {
  switch (action.type) {
    case ADD_USERS:
      return action.users
    default:
      return state
  }
}
