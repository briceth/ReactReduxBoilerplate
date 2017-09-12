import axios from 'axios'
import { FETCH_PRODUCTS } from './types'
import { _calculateDateDiff, _formatDateAndPrice, _manageDate } from '../utils/Helpers'

export function fetchApi() {
  return axios.get(`http://localhost:8000/api/products?limit=30`)
}

export function formatData(response) {
  const ndjson = response.data.split('\n').slice(0, -1)
  const json = ndjson.map((item, i) => JSON.parse(item))
  //console.log(json)
  return {
    type: FETCH_PRODUCTS,
    payload: json,
  }
}

export function handlError(error) {
  return {
    type: 'SOME_ERROR',
    error
  }
}

export function fetchInitialProducts() {
  //console.log('on dispatch')
  return dispatch => {
    return fetchApi()
      .then(response => dispatch(formatData(response)))
      .then(json => dispatch(_formatDateAndPrice(json)))
      .catch(err => dispatch(handlError(err)))
  }
}
