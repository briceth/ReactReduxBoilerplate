import React, { Component } from 'react'
import connect from 'redux-connect-decorator'
import { fetchProducts } from '../actions/products'
import { HeaderWrapper, HeaderContent } from '../components/header'
import { Filter } from '../components/filter'
import { Container } from '../components/container'
import { TitleAlpha, Tagline } from '../components/title'

@connect(store => ({}), { fetchProducts })

export default class Header extends Component {
  render() {
    return (
      <HeaderWrapper>
        <Container>
          <HeaderContent>
            <TitleAlpha>Discount Ascii Warehouse</TitleAlpha>
            <Tagline>Here you're sure to find a bargain on some of the finest ascii available to purchase. Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices.</Tagline>
            <Tagline>But first, a word from our sponsors:</Tagline> {document.write('<img className="ad" src="/ad/?r=' + Math.floor(Math.random()*1000) + '"/>')}
          </HeaderContent>
            <Filter>
              <select onChange={(event) => {this.props.fetchProducts(event.target.value)}}>
                <option value="id" defaultValue>Id</option>
                <option value="size">Size</option>
                <option value="price">Price</option>
              </select>
            </Filter>
        </Container>
      </HeaderWrapper>
    )
  }
}
