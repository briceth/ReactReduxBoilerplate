import React, { Component } from 'react';
import Waypoint from 'react-waypoint';
import PropTypes from 'prop-types';
import {
  EmoticonItem,
  EmoticonFace,
  EmoticonId,
  EmoticonDate,
  EmoticonPrice,
  EmoticonSize,
  EmoticonFaceWrapper,
  EmoticonDetails,
} from './component';

export default class Emoticon extends Component {
  static propTypes = {
    emoticon: PropTypes.object.isRequired,
  };

  constructor() {
    super();

    this.state = {
      enter: false,
    };
  }

  render() {
    const { emoticon } = this.props;
    return (
      <EmoticonItem>
        <Waypoint
          onEnter={() => {
            this.setState({ enter: true });
          }}
        />
        <EmoticonFaceWrapper>
          <EmoticonFace size={emoticon.size}>{emoticon.face}</EmoticonFace>
        </EmoticonFaceWrapper>
        <EmoticonDetails enter={this.state.enter}>
          <EmoticonPrice>{emoticon.price}</EmoticonPrice>
          <EmoticonSize>{emoticon.size}px</EmoticonSize>
          <EmoticonId>{emoticon.id}</EmoticonId>
          <EmoticonDate>{emoticon.date[0]}</EmoticonDate>
        </EmoticonDetails>
      </EmoticonItem>
    );
  }
}
