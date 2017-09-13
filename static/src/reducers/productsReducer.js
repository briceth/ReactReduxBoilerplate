import { FETCH_PRODUCTS, FETCH_MORE_PRODUCTS, NO_MORE_DATA } from '../actions/types'

export default function(state = { products: [] }, action) {
  console.log(action.payload)
  switch (action.type) {
    case FETCH_PRODUCTS:
      return { ...state, products: [ ...state.products, action.payload ] }
    // case FETCH_MORE_PRODUCTS:
    //   return { ...state, products: [ ...state.products, action.payload ] }
    case NO_MORE_DATA:
      return { ...state, noMoreData: action.value }
    }
    return state
  }
