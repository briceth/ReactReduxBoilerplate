import update from 'react-addons-update'
import { FETCH_PRODUCTS, FETCH_MORE_PRODUCTS, NO_MORE_DATA,
  FILTER_INPUT_SEARCH, INCREASE_SKIP } from '../actions/types'

const DEFAULT_STATE = {
  products: [],
  skip: 0
}

export default function(state = DEFAULT_STATE, action) {
  console.log(state.skip)
  switch (action.type) {
    case FETCH_PRODUCTS:
      return update(state, { products: { $push: action.payload }})
      //return { ...state, products: [ ...state.products, action.payload ] }
    case NO_MORE_DATA:
      return { ...state, noMoreData: action.value }
    case INCREASE_SKIP:
      return { ...state, skip: state.skip + 30 }
    default:
      return state
    }
  }
