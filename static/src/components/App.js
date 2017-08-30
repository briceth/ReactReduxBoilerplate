import React, { Component } from 'react'
import axios from 'axios'
import Loading from '../utils/Loader'
import Filter from './Filter'
import update from 'react-addons-update'
import Waypoint from 'react-waypoint'

class App extends Component {
  constructor() {
    super()
    this._callback = this._callback.bind(this)
    this._handleWaypointEnter = this._handleWaypointEnter.bind(this)

    this.state = {
      loading: true,
      emoticons: []
    }
  }


  _calculateDateDiff(notFormatedDate) {
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

  _formatDateAndPrice(selectAllprices) {
    return selectAllprices.map(element => {
      const formatedPrice = '$' + element.price.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

      let totalDate = []
      totalDate.push(this._calculateDateDiff(element.date))

      const newPriceAndDate = update(element, {
        price: { $set: formatedPrice },
        date: { $set: totalDate }
      })
      return newPriceAndDate;
    })
  }


  componentDidMount() {
    axios.get(`http://localhost:8000/api/products?limit=29`)
    .then((response) => {
      const ndjson = response.data.split('\n').slice(0, -1)
      const json = ndjson.map((item, i) => JSON.parse(item))

      const formatDateAndPrice = this._formatDateAndPrice(json)
      this.setState({ emoticons: formatDateAndPrice, loading: false })
    })
  }

  _manageDate(emoticon) {
    console.log(emoticon.date[0])
    if(emoticon.date[0].day > 0) {
      return <div>{emoticon.date[0].day} days ago</div>
    } else if (emoticon.date[0].day < 0) {
     return <div>{emoticon.date[0].hour} hours ago</div>
   } else {
     const entireDate = emoticon.date[0].toString().substr(0,15)
     return <div>{ entireDate }</div>
   }
  }

  _renderEmoticons() {
    return this.state.emoticons.map((emoticon, index) => {
      return (
          <div key={index} className="emoticon">
            <div>{emoticon.face}</div>
            {/* <div>id:{emoticon.id}</div> */}

            { this._manageDate(emoticon) }

            <div>price:{emoticon.price}</div>
            <div>size:{emoticon.size}</div>
          </div>
      )
    })
  }

  _callback(filter) {
    axios.get(`http://localhost:8000/api/products?sort=${filter}`)
    .then((response) => {
      const ndjson = response.data.split('\n').slice(0, -1)
      const json = ndjson.map((item, i) => JSON.parse(item))
      this.setState({ emoticons: json })
    })
  }

  _handleWaypointEnter() {
    let skip = 30
    axios.get(`http://localhost:8000/api/products?limit=30&skip=${skip}`)
    .then((response) => {
      const ndjson = response.data.split('\n').slice(0, -1)
      const json = ndjson.map((item, i) => JSON.parse(item))

      const formatDateAndPrice = this._formatDateAndPrice(json)

      const currentEmoticons = this.state.emoticons
      for (let i = 0; i < formatDateAndPrice.length; i++) {
        currentEmoticons.push(formatDateAndPrice[i])
      }

      this.setState({ emoticons: currentEmoticons })

      skip += 30
    })
  }

  _renderWaypoint() {
    return (
      <Waypoint
        onEnter={this._handleWaypointEnter}
      />
    );
  }



  render() {
    if (this.state.loading) {
      return (
        <div className='loading'>
          <Loading />
        </div>
      )
    }

    return (
      <div className="App">
        <div className="App-header">
            <Filter callbackFromParent={this._callback}/>
        </div>
        <div className="emoticonsList">
          { this._renderEmoticons() }
          { this._renderWaypoint() }
        </div>
        <div className='loading'>
          <Loading />
        </div>
      </div>
    );
  }
}

export default App;
