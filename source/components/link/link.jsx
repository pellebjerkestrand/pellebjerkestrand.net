import React from 'react';
import PropTypes from 'prop-types';

const Link = ({ children, url }) => (
  <a className="link" href={url}>
    {children}
  </a>
);

Link.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  url: PropTypes.string
};

export default Link;
