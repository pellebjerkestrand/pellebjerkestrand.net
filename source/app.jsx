import React from 'react';
import PropTypes from 'prop-types';

const App = ({ children, css, js }) => (
  <html>
    <head>
      {css.map((file, index) => (
        <link key={index} rel="stylesheet" href={`/${file}`} />
      ))}
    </head>
    <body id="mount-point">{children}</body>
    {js.map((file, index) => <script key={index} src={`/${file}`} />)}
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
