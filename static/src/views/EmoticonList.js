import React, { Component } from 'react'
import connect from 'redux-connect-decorator'
import { fetchProducts } from '../actions/products'
import { Emoticons } from '../components/emoticon'
import { Loading } from '../components/loading'
import { Filter } from '../components/filter'
import { Container } from '../components/container'
import LoadingSquare from '../utils/Loader'
import Waypoint from 'react-waypoint'
import Emoticon from './Emoticon'
//import { _manageDate } from '../utils/Helpers'

@connect(store => ({
  emoticons: store.emoticons,
  skip: store.emoticons.skip
}), {
  fetchProducts
})

export default class EmoticonList extends Component {
  constructor() {
    super()

  }

  componentDidMount() {
    this.props.fetchProducts()
    this.setState({ loading: false })
  }

  renderEmoticons() {
    let emoticons = this.props.emoticons.products
    if ( typeof emoticons == 'object' ) {
      return emoticons.map((emoticon, index) => <Emoticon
                                                  emoticon={emoticon}
                                                  key={index}
                                                />
      )
    }
  }

  handleWaypointEnter = () => {
    const { skip } = this.props
    this.props.fetchProducts(skip)
  }

  // renderLoadingOrEndOfCatalogue () => {
  //   if(this.state.noMoreData) {
  //     return <div>~ end of catalogue ~</div>
  //   } else {
  //     return <LoadingSquare type='bars' color='#444' />
  //   }
  // }

  render() {
    if (!this.props.emoticons.products[0]) {
      return (
        <Loading>
          <LoadingSquare type='bars' color='#444' />
        </Loading>
      )
    }

    return (
      <Container>
        <Emoticons>
          { this.renderEmoticons() }
          <Waypoint
            onEnter={this.handleWaypointEnter}
            //onLeave={this.handleWaypointEnter}
           />
        </Emoticons>
        <Loading>
          {/* { this.renderLoadingOrEndOfCatalogue() } */}
        </Loading>
      </Container>
    );
  }
}

//const mapStateToProps = ({ emoticons }) => ({ emoticons }) // === const mapStateToProps = state => ({ emoticons: state.emoticons })

//export default connect(mapStateToProps)(EmoticonList)
