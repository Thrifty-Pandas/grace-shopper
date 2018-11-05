import axios from 'axios'

const initialState = []

export const SET_CATEGORIES = 'SET_CATEGORIES'
export const ADD_CATEGORY = 'ADD_CATEGORY'

export const setCategories = categories => ({
  type: SET_CATEGORIES,
  categories
})
export const addCategory = category => ({
  type: ADD_CATEGORY,
  category
})

export const postCategory = category => async dispatch => {
  try {
    const {data} = await axios.post('/api/categories', category)
    dispatch(addCategory(data))
  } catch (err) {
    console.error(err)
  }
}

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
    case ADD_CATEGORY:
      return [...state, action.category]
    default:
      return state
  }
}
