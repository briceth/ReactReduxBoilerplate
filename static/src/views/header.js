import React, { Component } from 'react'
import connect from 'redux-connect-decorator'
import { fetchProducts } from '../actions/products'
import { HeaderWrapper, HeaderContent } from '../components/header'
import { Filter } from '../components/filter'
import { Container } from '../components/container'

@connect(store => ({}), { fetchProducts })

export default class Header extends Component {
  render() {
    return (
      <HeaderWrapper>
        <Container>
          <HeaderContent>
            <h1>Discount Ascii Warehouse</h1>
            <p>Here you're sure to find a bargain on some of the finest ascii available to purchase. Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices.</p>
          </HeaderContent>
            <Filter>
              <select onChange={(event) => {this.props.fetchProducts(event.target.value)}}>
                <option value="size" defaultValue>Size</option>
                <option value="price">Price</option>
                <option value="id">Id</option>
              </select>
            </Filter>
        </Container>
      </HeaderWrapper>
    )
  }
}
