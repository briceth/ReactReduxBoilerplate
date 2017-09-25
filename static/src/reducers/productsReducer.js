import update from 'react-addons-update'
import { FETCH_PRODUCTS, FETCH_MORE_PRODUCTS, NO_MORE_DATA,
  FILTER_INPUT_SEARCH, INCREASE_SKIP, FILTER_CATEGORY,
  IS_CHANGING_CATEGORY, CHANGED_CATEGORY, ERROR } from '../actions/types'

const DEFAULT_STATE = { products: [], skip: 0, noMoreData: false, category: '', isChangingCategory: false, error: ''}

export default function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return update(state, { products: { $push: action.payload }})
    case NO_MORE_DATA:
      return { ...state, noMoreData: true }
    case INCREASE_SKIP:
      return { ...state, skip: state.skip + 15 }
    case FILTER_INPUT_SEARCH:
      return update(state, { products: { $set: action.payload }})
    case FILTER_CATEGORY:
      return { ...state, category: action.payload }
    case IS_CHANGING_CATEGORY:
      return update(state, { isChangingCategory: { $set: true }})
    case CHANGED_CATEGORY:
      return update(state, { isChangingCategory: { $set: false }})
    case ERROR:
      return { ...state, error: action.payload }
    default:
      return state
    }
  }
