import React, { Component } from 'react'
import connect from 'redux-connect-decorator'
import { filterInputSearch, fetchProducts } from '../actions/products'
import { HeaderWrapper, HeaderContent } from '../components/header'
import { Filter } from '../components/filter'
import { Container } from '../components/container'
import { TitleAlpha, Tagline } from '../components/title'

@connect(store => ({}), { filterInputSearch, fetchProducts })

export default class Header extends Component {

  handleChange = (event) => {
    event.preventDefault()
    this.props.filterInputSearch(event.target.value)
  }
  render() {
    return (
      <HeaderWrapper>
        <Container>
          <HeaderContent>
            <TitleAlpha>Discount Ascii Warehouse</TitleAlpha>
            <Tagline>Here you're sure to find a bargain on some of the finest ascii available to purchase. Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices.</Tagline>
            <Tagline>But first, a word from our sponsors:</Tagline>
          </HeaderContent>
            <Filter>
              <select onChange={(event) => { this.handleChange(event) }}>
                <option></option>
                <option value="id">Id</option>
                <option value="size">Size</option>
                <option value="price">Price</option>
              </select>
            </Filter>
        </Container>
      </HeaderWrapper>
    )
  }
}
