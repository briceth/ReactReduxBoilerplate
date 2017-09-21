import React, { Component } from 'react'
import EmoticonList from './EmoticonList'
import Header from './header'
import { Wrapper } from '../components/wrapper'

class App extends Component {
  render() {
    return(
      <Wrapper>
        <Header />
        <EmoticonList />
      </Wrapper>

    )
  }
}

export default App;
