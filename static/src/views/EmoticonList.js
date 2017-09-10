import React, { Component } from 'react'
import { Emoticons } from '../components/emoticon'
import { Loading } from '../components/loading'
import { Filter } from '../components/Filter'
import { Container } from '../components/container'
import axios from 'axios'
import LoadingSquare from '../utils/Loader'
import FilterInput from './FilterInput'
import update from 'react-addons-update'
import Waypoint from 'react-waypoint'
import Emoticon from './Emoticon'
import { _calculateDateDiff, _formatDateAndPrice, _manageDate } from '../utils/Helpers'

export default class EmoticonList extends Component {
  constructor() {
    super()
    this._handleWaypointEnter = this._handleWaypointEnter.bind(this)

    this.state = {
      loading: true,
      emoticons: [],
      noMoreData: false,
      skip: 30
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:8000/api/products?limit=30`)
    .then((response) => {
      const ndjson = response.data.split('\n').slice(0, -1)
      const json = ndjson.map((item, i) => JSON.parse(item))

      const formatDateAndPrice = _formatDateAndPrice(json)
      this.setState({ emoticons: formatDateAndPrice, loading: false })
    })
  }

  _renderEmoticons() {
    const emoticons = this.state.emoticons
      return emoticons.map((emoticon, index) => {
        return <Emoticon emoticon={emoticon} key={index} manageDate={_manageDate}/>
      })
    }

  _handleWaypointEnter() {
    const { skip } = this.state
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

      this.setState({ emoticons: currentEmoticons, skip: skip + 30 })
    })
  }


  _renderLoadingOrEndOfCatalogue() {
    if(this.state.noMoreData) {
      return <div>~ end of catalogue ~</div>
    } else {
      return <LoadingSquare type='bars' color='#444' />
    }
  }


  render() {
    if (this.state.loading) {
      return (
        <Loading>
          <LoadingSquare type='bars' color='#444' />
        </Loading>
      )
    }

    return (
      <Container>
        <Emoticons>
          { this._renderEmoticons() }
          <Waypoint
            onEnter={this._handleWaypointEnter}
            onLeave={this._handleWaypointEnter}
           />
        </Emoticons>
        <Loading>
          { this._renderLoadingOrEndOfCatalogue() }
        </Loading>
      </Container>
    );
  }
}
