import axios from 'axios'
import update from 'react-addons-update'
import { FETCH_PRODUCTS, FETCH_MORE_PRODUCTS, NO_MORE_DATA, FORMAT_DATA } from './types'
//import { _calculateDateDiff, _manageDate } from '../utils/Helpers'

export function fetchApi(skip) {
  return axios.get(`http://localhost:8000/api/products?limit=30&skip=${skip}`)
}

export function _calculateDateDiff(notFormatedDate) {
  var currentDate = new Date()
  var dateProduct = new Date(notFormatedDate)

  var diff = {}
  var tmp = currentDate - dateProduct
  tmp = Math.floor(tmp/1000)            // Nombre de secondes entre les 2 dates
  diff.sec = tmp % 60                    // Extraction du nombre de secondes

  tmp = Math.floor((tmp-diff.sec)/60)    // Nombre de minutes (partie entière)
  diff.min = tmp % 60                    // Extraction du nombre de minutes

  tmp = Math.floor((tmp-diff.min)/60)    // Nombre d'heures (entières)
  diff.hour = tmp % 24                   // Extraction du nombre d'heures

  tmp = Math.floor((tmp-diff.hour)/24)   // Nombre de jours restants
  diff.day = tmp

  if (diff.day > 6) {
    return dateProduct
  } else {
    return diff
  }
}

export function _formatDateAndPrice(selectAllprices) {
  let selectAllpricesArray = selectAllprices.payload
  let newPricesAndDateArray = []

  selectAllprices.map(element => {
    const formatedPrice = '$' + element.price.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    let totalDate = []
    totalDate.push(_calculateDateDiff(element.date))

    const newPriceAndDate = update(element, {
      price: { $set: formatedPrice },
      date: { $set: totalDate }
    })
    newPricesAndDateArray.push(newPriceAndDate)
  })
  return newPricesAndDateArray
}

function fetchAllProducts(response) {
  const ndjson = response.data.split('\n').slice(0, -1)
  const json = ndjson.map((item, i) => JSON.parse(item))

  return {
    type: FETCH_PRODUCTS,
    payload: _formatDateAndPrice(json)
  }
}

export function _manageDate(emoticon) {
  if(emoticon.date[0].day > 0) {
    let moreThan1Day = emoticon.date[0].day + " days ago"
    return moreThan1Day
  } else if (emoticon.date[0].day < 0) {
    let lessThan1Day = emoticon.date[0].day = " hours ago"
    return lessThan1Day
 } else {
   const entireDate = emoticon.date[0].toString().substr(0,15)
   return entireDate.split(' ').join('/')
 }
}

export function handlError(error) {
  return {
    type: 'SOME_ERROR',
    error
  }
}


export function isBackOfficeEmpty(data) {
  //console.log(data)
// array does not exist, is not an array, or is empty
  if (!Array.isArray(data) || !data.length) {
    return {
      type: NO_MORE_DATA,
      value: true
    }
  }
}

////////////////////thunk///////////////
export function fetchProducts(skip) {
  //console.log('on dispatch')
  return dispatch => {
    return fetchApi(skip)
    .then(response => dispatch(fetchAllProducts(response)))
    .then(data => dispatch(isBackOfficeEmpty(data)))
    .catch(err => dispatch(handlError(err)))
  }
}

// export function fetchMoreData(skip) {
//   return dispatch => {
//     return fetchApi(skip)
//       .then(response => dispatch(formatData(response)))
//       .then(json => dispatch(_formatDateAndPrice(json)))
//       .catch(err => dispatch(handlError(err)))
//   }
// }
