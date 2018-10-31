import axios from 'axios'

// action types
const GET_USERS = 'GET_USERS'
const GET_USER_BY_ID = 'GET_USER_BY_ID'
const CREATE_USER = 'CREATE_USER'

//initial state
const initialUsers = []

//action creators
export const setUsers = users => {
  return {
    type: GET_USERS,
    users
  }
}
export const addUser = user => {
  return {
    type: ADD_USER,
    user
  }
}
//thunk creators

export const fetchUsers = () => async dispatch => {
  try {
    const res = await axios.get('/api/users')
    dispatch(setUsers(res.data))
  } catch (err) {
    console.error(err)
  }
}

//note: may not be needed as this resets the state to the single user that is returned.
export const fetchUserById = userId => async dispatch => {
  try {
    const res = await axios.get(`api/users/${userId}`)
    dispatch(setUsers(res.data))
  } catch (err) {
    console.error(err)
  }
}
export const createUser = user => async dispatch => {
  try {
    const res = await axios.post('/api/users', user)
    dispatch(addUser(res.data))
  } catch (err) {
    console.error(err)
  }
}
//reducer

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return action.users
    case ADD_USER:
      return [...state, action.user]
    default:
      return state
  }
}
