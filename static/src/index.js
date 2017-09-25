import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

export const createStoreWithMiddleware = createStore(
  reducers,
  compose(
    typeof window === 'object' &&
    typeof window.devToolsExtension !== 'undefined'
      ? window.devToolsExtension()
      : f => f,
  ),
  applyMiddleware(thunk),
);

import { injectGlobal } from 'styled-components';

injectGlobal`
  @import url('https://necolas.github.io/normalize.css/7.0.0/normalize.css');
  @import url('https://fonts.googleapis.com/css?family=Titillium+Web:400,600');
  html {
    text-rendering: optimizeLegibility;
    font-feature-settings: "pnum";
    font-variant-numeric: proportional-nums;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 16px;
    font-weight: 400;
    overflow-x: hidden;
    line-height: 1.8;
    color: white;
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
  document.getElementById('root'),
);
