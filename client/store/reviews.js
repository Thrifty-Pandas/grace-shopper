import axios from 'axios'

export const GET_REVIEWS = 'GET_REVIEWS'
export const ADD_REVIEW = 'ADD_REVIEW'

const initialState = []

export const getReviews = reviews => ({
  type: GET_REVIEWS,
  reviews
})
export const addReview = review => ({
  type: ADD_REVIEW,
  review
})

export const postReview = review => async dispatch => {
  try {
    const {data} = await axios.post('/api/reviews', review)
    dispatch(addReview(data))
  } catch (err) {
    console.error(err)
  }
}

export const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REVIEWS:
      return [...action.reviews]
    case ADD_REVIEW:
      return [...state, action.review]
    default:
      return state
  }
}
