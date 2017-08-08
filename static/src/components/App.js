import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor() {
    super()

    this.state = {
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
      <div key={index}>
        <div>id:{emoticon.id}</div>
        <div>{emoticon.face}</div>
        <div>{emoticon.date}</div>
        <div>price:{emoticon.price}</div>
        <div>size:{emoticon.size}</div>
      </div>
      )
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
        </div>
          <ul>
            { this._renderEmoticons() }
          </ul>
      </div>
    );
  }
}

export default App;
