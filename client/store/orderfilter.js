const initialFilter = []

export const SET_ORDERFILTER = 'SET_ORDERFILTER'

export const setOrderFilters = parameters => ({
  type: SET_ORDERFILTER,
  parameters
})

export const orderFilterReducer = (state = initialFilter, action) => {
  switch (action.type) {
    case SET_ORDERFILTER:
      return action.parameters
    default:
      return state
  }
}
