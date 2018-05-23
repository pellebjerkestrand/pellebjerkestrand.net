import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

import App from './app';
import Home from './pages/home';

if (typeof document !== 'undefined') {
  ReactDOM.hydrate(<Home />, document.getElementById('mount-point'));
}

export default ({ webpackStats }) => {
  const files = Object.keys(webpackStats.compilation.assets);
  const css = files.filter(value => value.match(/\.css$/));
  const js = files.filter(
    value => value.match(/\.js$/) && value.includes('static')
  );

  return `<!doctype html>${ReactDOMServer.renderToString(
    <App css={css} js={js}>
      <Home />
    </App>
  )}`;
};
