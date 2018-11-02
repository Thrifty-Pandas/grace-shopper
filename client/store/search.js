const initialResults = []
export const SET_RESULTS = 'SET_RESULTS'
// the results are an array of id's that reference the objects that match the search
export const setResults = results => ({
  type: SET_RESULTS,
  results
})
export const searchReducer = (state = initialResults, action) => {
  switch (action.type) {
    case SET_RESULTS:
      return action.results
    default:
      return state
  }
}
