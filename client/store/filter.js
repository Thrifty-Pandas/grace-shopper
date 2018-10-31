const initialFilter = []

export const SET_FILTER = 'SET_FILTER'

export const setFilters = parameters => ({
  type: SET_FILTER,
  parameters
})

export const filterReducer = (state = initialFilter, action) => {
  switch (action.type) {
    case SET_FILTER:
      return action.parameters
    default:
      return state
  }
}
