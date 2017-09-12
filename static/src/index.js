import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers'

const createStoreWithMiddleware = createStore(reducers, applyMiddleware(thunk))

import { injectGlobal } from 'styled-components';

injectGlobal`
  @import url('https://necolas.github.io/normalize.css/7.0.0/normalize.css');
  @import url('https://fonts.googleapis.com/css?family=Titillium+Web:400,600');
  html {
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    background: white;
    font-size: 16px;
    color: rgba(0,0,0, .8);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    font-feature-settings: "pnum";
    font-variant-numeric: proportional-nums;
    font-weight: 400;
    overflow-x: hidden;
    line-height: 1.8;
  }

  input, textarea {
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 16px;
    color: rgba(0,0,0, .8);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

  }

  body {
    margin: 0;
  }

  *{ box-sizing: border-box }
`;


import App from './views/App';

ReactDOM.render(
  <Provider store={createStoreWithMiddleware}>
    <App />
  </Provider>,
  document.getElementById('root')
);
