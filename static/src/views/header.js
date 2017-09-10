import React, { Component } from 'react'
import { HeaderWrapper, HeaderContent } from '../components/header'
import FilterInput from './FilterInput'
import { Filter } from '../components/Filter'

export default class Header extends Component {
  constructor() {
    super()
  }

  filter(filterCategory) {
    axios.get(`http://localhost:8000/api/products?sort=${filterCategory}`)
    .then((response) => {
      const ndjson = response.data.split('\n').slice(0, -1)
      const json = ndjson.map((item, i) => JSON.parse(item))
      this.setState({ emoticons: json })
    })
  }

  render() {
    return (
      <HeaderWrapper>
        <HeaderContent>
        <h1>Discount Ascii Warehouse</h1>

        <p>Here you're sure to find a bargain on some of the finest ascii available to purchase. Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices.</p>

        <Filter>
          <FilterInput callbackFromParent={this.filter.bind(this)}/>
        </Filter>
      </HeaderContent>
      </HeaderWrapper>
    )
  }
}
