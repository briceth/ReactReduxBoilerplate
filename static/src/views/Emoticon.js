import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { EmoticonItem, EmoticonFace, EmoticonId, EmoticonDate, EmoticonPrice,
  EmoticonSize, EmoticonFaceWrapper, EmoticonDetails } from '../components/emoticon'
import Waypoint from 'react-waypoint'

export default class Emoticon extends Component {
  constructor() {
    super()

    this.state = {
      enter: false
    }
  }

  render() {
    const { emoticon, index } = this.props;
    return (
      <EmoticonItem key={index}>
        <EmoticonFaceWrapper>
          <EmoticonFace size={emoticon.size}>{emoticon.face}</EmoticonFace>
        </EmoticonFaceWrapper>

        <EmoticonDetails enter={this.state.enter} leave={this.state.leave}>
          <EmoticonPrice>{emoticon.price}</EmoticonPrice>
          <EmoticonSize>{emoticon.size}px</EmoticonSize>

          <EmoticonId>{emoticon.id}</EmoticonId>
          <EmoticonDate>{emoticon.date[0]}</EmoticonDate>
        </EmoticonDetails>
        <Waypoint onEnter={() => { this.setState({ enter: true }) }} />
      </EmoticonItem>
    )
  }
}
