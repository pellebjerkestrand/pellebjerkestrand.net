import React from 'react';
import PropTypes from 'prop-types';

const Link = ({ icon, text, url }) => (
  <a className="link" href={url}>
    {icon && <span className="link__icon">{icon}</span>}
    <span className="link__text">{text}</span>
  </a>
);

Link.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default Link;
