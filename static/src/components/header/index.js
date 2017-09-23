import React, { Component } from 'react'
import connect from 'redux-connect-decorator'
import { HeaderWrapper, HeaderContent } from './component'
import { Container } from '../container'
import { TitleAlpha, Tagline } from '../title'
import Input from '../input'

const Header = () => {
    return (
      <HeaderWrapper>
        <Container>
          <HeaderContent>
            <TitleAlpha>Discount Ascii Warehouse</TitleAlpha>
            <Tagline>Here you're sure to find a bargain on some of the finest ascii available to purchase. Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices.</Tagline>
            <Tagline>But first, a word from our sponsors:</Tagline>
          </HeaderContent>
            <Input />
        </Container>
      </HeaderWrapper>
    )
}

export default Header
