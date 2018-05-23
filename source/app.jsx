import React from 'react';
import PropTypes from 'prop-types';

const App = ({ children, css, js }) => (
  <html>
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Pelle Bjerkestrand - Programmer</title>
      {css.map(file => <link key={file} rel="stylesheet" href={`/${file}`} />)}
    </head>
    <body>
      <div id="mount-point">{children}</div>
      {js.map(file => <script key={file} src={`/${file}`} />)}
    </body>
  </html>
);

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  css: PropTypes.array,
  js: PropTypes.array
};

App.defaultProps = {
  css: [],
  js: []
};

export default App;
