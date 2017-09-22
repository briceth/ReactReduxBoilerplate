import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import shortid from 'shortid'
import connect from 'redux-connect-decorator'
import { fetchProducts } from '../actions/products'
import { Emoticons, AddSponsor } from '../components/emoticon'
import { Loading } from '../components/loading'
import { Filter } from '../components/filter'
import { Container } from '../components/container'
import LoadingSquare from '../utils/Loader'
import Waypoint from 'react-waypoint'
import Emoticon from './Emoticon'

@connect(store => ({
  emoticons: store.emoticons,
  skip: store.emoticons.skip,
  noMoreEmoticons: store.emoticons.noMoreData
}), {
  fetchProducts
})

export default class EmoticonList extends Component {

  componentDidMount() {
    this.props.fetchProducts()
    this.setState({ loading: false })
  }

  renderEmoticons() {
    let emoticons = this.props.emoticons.products
    if ( typeof emoticons == 'object' ) {
      return emoticons.map((emoticon, index) => {
        if(index % 20 === 0) {
          return <AddSponsor key={index}>A word from our sponsors:</AddSponsor>
        }

        return <Emoticon
                  //ref={(el) => console.log(ReactDOM.findDOMNode(el).getBoundingClientRect()) }
                  emoticon={emoticon}
                  key={shortid.generate()}
                />
        }
      )
    }
  }

  handleWaypointEnter = () => {
    const { skip } = this.props
    this.props.fetchProducts(skip)
  }

  renderLoadingOrEndOfCatalogue() {
    if(this.props.noMoreEmoticons) {
      return <h2>~ end of catalogue ~</h2>
    } else {
      return <LoadingSquare type='bars' color='#444' />
    }
  }

  render() {
    if (!this.props.emoticons.products.length) {
      return (
        <Loading>
          <LoadingSquare type='bars' color='#444' />
        </Loading>
      )
    }

    return (
      <Container>
        <Emoticons>
          {this.renderEmoticons()}
          <Waypoint
            onEnter={this.handleWaypointEnter}
           />
        </Emoticons>
        <Loading>
          {this.renderLoadingOrEndOfCatalogue()}
        </Loading>
      </Container>
    );
  }
}
