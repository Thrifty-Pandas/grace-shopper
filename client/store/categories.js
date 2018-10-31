import axios from 'axios'

const initialState = []

export const SET_CATEGORIES = 'SET_CATEGORIES'

export const setCategories = categories => ({
  type: SET_CATEGORIES,
  categories
})

export const fetchCategories = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/categories')
    dispatch(setCategories(data))
  } catch (err) {
    console.error(err)
  }
}

export const categoriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.categories
    default:
      return state
  }
}
