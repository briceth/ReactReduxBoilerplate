import { FETCH_PRODUCTS } from '../actions/types'

export default function(state = { products: [] }, action) {
  console.log(action.payload)
  switch (action.type) {
    case FETCH_PRODUCTS:
      return { ...state, products: [ ...state.products, action.payload ] }
    }
    return state
  }
