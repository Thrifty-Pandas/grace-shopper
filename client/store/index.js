import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import {productsReducer} from './products'
import {categoriesReducer} from './categories'
import {filterReducer} from './filter'
import {searchReducer} from './search'
import {cartReducer} from './cart'
import {reviewsReducer} from './reviews'

const reducer = combineReducers({
  user,
  products: productsReducer,
  categories: categoriesReducer,
  filter: filterReducer,
  search: searchReducer,
  cart: cartReducer,
  reviews: reviewsReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './products'
export * from './categories'
export * from './filter'
//export * from './cart'
export * from './reviews'
