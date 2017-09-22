import axios from 'axios'
import update from 'react-addons-update'
import { FETCH_PRODUCTS, FETCH_MORE_PRODUCTS, NO_MORE_DATA,
  FORMAT_DATA, FILTER_INPUT_SEARCH, INCREASE_SKIP, FILTER_CATEGORY } from './types'

const ROOT_URL = `http://localhost:8000/api/products`

////////////////////redux-thunk///////////////////////////////////////////
export function fetchProducts(skip: integer, filterCategory = "") {
  console.log(skip, filterCategory)
  return (dispatch: Function) => {
    return axios.get(`${ROOT_URL}?limit=15&skip=${skip}&sort=${filterCategory}`)
      .then(response => dispatch(fetchAllProducts(response.data)))
      .then(dispatch({ type: INCREASE_SKIP }))
      .then(data => dispatch(isBackOfficeEmpty(data)))
      .catch(error => dispatch(handleError(error)))
  }
}

/////////////////////actions creator///////////////////////////////////////
function fetchAllProducts(unParsedData) {
  const ndjson = unParsedData.split('\n').slice(0, -1)
  const parsedData = ndjson.map((item, i) => JSON.parse(item))

  return {
    type: FETCH_PRODUCTS,
    payload: formatDateAndPrice(parsedData)
  }
}

function formatDateAndPrice(selectAllprices) {
  const newPricesAndDate = []

  selectAllprices.map(element => {
    const formatedPrice = '$' + element.price.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    const totalDate = []
    totalDate.push(dateDiff(element.date))
    const newPriceAndDate = update(element, {
                                    price: { $set: formatedPrice },
                                    date: { $set: totalDate }
                                  })
    newPricesAndDate.push(newPriceAndDate)
  })
  return newPricesAndDate
}

function dateDiff(unFormatedDate) {
  var currentDate = new Date()
  var dateProduct = new Date(unFormatedDate)

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

function handleError(error) {
  return {
    type: 'SOME_ERROR',
    error
  }
}

function isBackOfficeEmpty(data) {
//array does not exist, is not an array, or is empty
  if (!Array.isArray(data.payload) || !data.length.payload) {
    return { type: NO_MORE_DATA }
  }
}

function fetchAllProductsFiltered(response) {
  const ndjson = response.split('\n').slice(0, -1)
  const parsedData = ndjson.map((item, i) => JSON.parse(item))
  console.log(parsedData)
  return {
    type: FILTER_INPUT_SEARCH,
    payload: formatDateAndPrice(parsedData)
  }
}

export function filterInputSearch(filterCategory: string){
  return (dispatch: Function) => {
    return axios.get(`${ROOT_URL}?limit=15&sort=${filterCategory}`)
      .then(response => dispatch(fetchAllProductsFiltered(response.data)))
      //.then(response => console.log(response.data))
      .then(dispatch({ type: FILTER_CATEGORY, payload: filterCategory }))
      .then(data => dispatch(isBackOfficeEmpty(data)))
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  }
}
