import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ children }) => <div className="card">{children}</div>;

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

export default Card;
