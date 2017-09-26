import React, { Component } from 'react';
import Waypoint from 'react-waypoint';
import PropTypes from 'prop-types';
import {
  Item,
  Face,
  Id,
  Date,
  Price,
  Size,
  FaceWrapper,
  Details,
} from './component';

export default class Emoticon extends Component {
  static propTypes = {
    emoticon: PropTypes.object.isRequired,
  };

  state = {
    enter: false,
  };

  render() {
    const { emoticon } = this.props;
    return (
      <Item>
        <Waypoint
          onEnter={() => {
            this.setState({ enter: true });
          }}
        />
        <FaceWrapper>
          <Face size={emoticon.size}>{emoticon.face}</Face>
        </FaceWrapper>
        <Details enter={this.state.enter}>
          <Price>{emoticon.price}</Price>
          <Size>{emoticon.size}px</Size>
          <Id>{emoticon.id}</Id>
          <Date>{emoticon.date[0]}</Date>
        </Details>
      </Item>
    );
  }
}
