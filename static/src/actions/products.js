import axios from 'axios'
import update from 'react-addons-update'
import { FETCH_PRODUCTS, FETCH_MORE_PRODUCTS, NO_MORE_DATA,
  FORMAT_DATA, FILTER_INPUT_SEARCH, INCREASE_SKIP } from './types'

// export function fetchApi(skip: string) {
//   return axios.get(`http://localhost:8000/api/products?limit=30&skip=${skip}`)
// }

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
    const substractMonth = dateProduct.toString().substr(4, 4)
    const getMonthInInteger = new Date(Date.parse(substractMonth +" 1, 2012")).getMonth()+1
    const entireDate = "0" + getMonthInInteger + " " + dateProduct.toString().substr(8, 7)
    return entireDate.split(' ').join('/')
  } else if (diff.day > 0) {
    return diff.day + " days ago"
  } else if (diff.day >= 0) {
    return diff.hour + " hours ago"
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

// export function _manageDate(emoticon) {
//   if(emoticon.date[0].day > 0) {
//     let moreThan1Day = emoticon.date[0].day + " days ago"
//     return moreThan1Day
//   } else if (emoticon.date[0].day < 0) {
//     let lessThan1Day = emoticon.date[0].day = " hours ago"
//     return lessThan1Day
//  } else {
//    const entireDate = emoticon.date[0].toString().substr(0,15)
//    return entireDate.split(' ').join('/')
//  }
// }

export function handlError(error) {
  return {
    type: 'SOME_ERROR',
    error
  }
}


export function isBackOfficeEmpty(data) {
// array does not exist, is not an array, or is empty
  if (!Array.isArray(data) || !data.length) {
    return {
      type: NO_MORE_DATA,
      value: true
    }
  }
}

function fetchAllProductsFiltered(response) {
  const ndjson = response.data.split('\n').slice(0, -1)
  const json = ndjson.map((item, i) => JSON.parse(item))

  return {
    type: FILTER_INPUT_SEARCH,
    payload: _formatDateAndPrice(json)
  }
}


// export function filterInputSearch(filterCategory: string){
//   return (dispatch: Function) => {
//     return axios.get(`http://localhost:8000/api/products?limit=30&skip=${skip}&sort=${filterCategory}`)
//       .then(response => dispatch(fetchAllProductsFiltered(response)))
//       .catch(error => dispatch(handlError(error)))
//   }
// }

////////////////////thunk///////////////
export function fetchProducts(skip, filterCategory) {
  return (dispatch: Function) => {
    return axios.get(`http://localhost:8000/api/products?limit=30&skip=${skip}`)
      .then(response => dispatch(fetchAllProducts(response)))
      .then(dispatch({ type: INCREASE_SKIP }))
      .then(data => dispatch(isBackOfficeEmpty(data)))
      .catch(error => dispatch(handlError(error)))
  }
}
