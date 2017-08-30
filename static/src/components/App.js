import React, { Component } from 'react'
import axios from 'axios'
import Loading from '../utils/Loader'
import Filter from './Filter'
import update from 'react-addons-update'
import Waypoint from 'react-waypoint'
import Emoticon from './Emoticon'
import { _calculateDateDiff, _formatDateAndPrice } from '../utils/Helpers'

class App extends Component {
  constructor() {
    super()
    this._callback = this._callback.bind(this)
    this._handleWaypointEnter = this._handleWaypointEnter.bind(this)

    this.state = {
      loading: true,
      emoticons: [],
      noMoreData: false
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:8000/api/products?limit=29`)
    .then((response) => {
      const ndjson = response.data.split('\n').slice(0, -1)
      const json = ndjson.map((item, i) => JSON.parse(item))

      const formatDateAndPrice = _formatDateAndPrice(json)
      this.setState({ emoticons: formatDateAndPrice, loading: false })
    })
  }

  _manageDate(emoticon) {
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
    const emoticons = this.state.emoticons
      return emoticons.map((emoticon, index) => {
        return <Emoticon emoticon={emoticon} index={index} manageDate={this._manageDate}/>
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

      if (!Array.isArray(json) || !json.length) {
        // array does not exist, is not an array, or is empty
        this.setState({ noMoreData: true })
      }

      const formatDateAndPrice = _formatDateAndPrice(json)

      const currentEmoticons = this.state.emoticons
      for (let i = 0; i < formatDateAndPrice.length; i++) {
        currentEmoticons.push(formatDateAndPrice[i])
      }

      this.setState({ emoticons: currentEmoticons })

      skip += 30
    })
  }


  _renderLoadingOrEndOfCatalogue() {
    if(this.state.noMoreData) {
      return <div>~ end of catalogue ~</div>
    } else {
      return <Loading type='bars' color='#444' />
    }
  }


  render() {
    if (this.state.loading) {
      return (
        <div className='loading'>
          <Loading type='bars' color='#444' />
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

          <Waypoint onEnter={this._handleWaypointEnter} />

        </div>
        <div className='loading'>

          { this._renderLoadingOrEndOfCatalogue() }

        </div>
      </div>
    );
  }
}

export default App;
