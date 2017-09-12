import { combineReducers } from 'redux'
import productsReducer from './productsReducer'

const reducers = combineReducers({
  emoticons: productsReducer
})

export default reducers
