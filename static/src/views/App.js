import React, { Component } from 'react'
import EmoticonList from './EmoticonList'
import Header from '../components/header/index'
import { Wrapper } from '../components/wrapper'

class App extends Component {
	render() {
		return (
			<Wrapper>
				<Header />
				<EmoticonList />
			</Wrapper>
		)
	}
}

export default App
