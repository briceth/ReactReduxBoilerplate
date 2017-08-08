import React, { Component } from 'react';
import axios from 'axios';
import Loader from '../utils/Loader';

class App extends Component {
  constructor() {
    super()

    this.state = {
      loading: true,
      emoticons: []
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:8000/api/products?sort=price`)
    .then((response) => {
      const ndjson = response.data.split('\n').slice(0, -1)
      const json = ndjson.map((item, i) => JSON.parse(item))
      this.setState({ emoticons: json })
    })
  }

  _renderEmoticons() {
    return this.state.emoticons.map((emoticon, index) => {
      return (
        <div key={index} className="emoticon">
          <div>{emoticon.face}</div>
          <div>id:{emoticon.id}</div>
          <div>{emoticon.date}</div>
          <div>price:{emoticon.price}</div>
          <div>size:{emoticon.size}</div>
        </div>
      )
    })
  }

  _renderLoading() {
    //return <Loader />
    return <div>Loading....</div>
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
        </div>
          <div className="emoticonsList">
            <Loader />
            { this.state.loading ? this._renderLoading() : this._renderEmoticons() }
          </div>
      </div>
    );
  }
}

export default App;
