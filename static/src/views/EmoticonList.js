import React, { Component } from 'react';
import shortid from 'shortid';
import connect from 'redux-connect-decorator';
import { fetchProducts } from '../actions/products';
import Emoticon from '../components/emoticon/index';
import { Emoticons, AddSponsor } from '../components/emoticon/component';
import { Loading } from '../components/loading';
import { Container } from '../components/container';
import LoadingSquare from '../utils/Loader';
import Waypoint from 'react-waypoint';
import { TitleBeta } from '../components/title';
import PropTypes from 'prop-types';

@connect(
  store => ({
    emoticons: store.emoticons,
    skip: store.emoticons.skip,
    noMoreEmoticons: store.emoticons.noMoreData,
    category: store.emoticons.category,
  }),
  {
    fetchProducts,
  },
)
export default class EmoticonList extends Component {
  static propTypes = {
    fetchProducts: PropTypes.func.isRequired,
    emoticons: PropTypes.object.isRequired,
    skip: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    noMoreEmoticons: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    this.props.fetchProducts();
  }

  renderEmoticons() {
    let emoticons = this.props.emoticons.products;
    return emoticons.map((emoticon, index) => {
      if (index % 20 === 0 && index !== 0) {
        return (
          <AddSponsor key={shortid.generate()}>
            A word from our sponsors:
            <img
              className="ad"
              src="/ad/?r=' + Math.floor(Math.random()*1000) + '"
            />
          </AddSponsor>
        );
      }
      return <Emoticon emoticon={emoticon} key={emoticon.id} />;
    });
  }

  handleWaypointEnter = () => {
    const { skip, category } = this.props;
    this.props.fetchProducts(skip, category);
  };

  renderLoadingOrEndOfCatalogue() {
    if (this.props.noMoreEmoticons) {
      return <TitleBeta>~ end of catalogue ~</TitleBeta>;
    } else {
      return <LoadingSquare type="bars" color="#444" />;
    }
  }

  render() {
    if (!this.props.emoticons.products.length) {
      return (
        <Loading>
          <LoadingSquare type="bars" color="#444" />
        </Loading>
      );
    }

    return (
      <Container>
        <Emoticons>
          {this.renderEmoticons()}
          <Waypoint onEnter={this.handleWaypointEnter} />
        </Emoticons>
        <Loading>{this.renderLoadingOrEndOfCatalogue()}</Loading>
      </Container>
    );
  }
}
