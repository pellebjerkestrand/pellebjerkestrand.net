import React from 'react';
import PropTypes from 'prop-types';

const Slide = ({ children }) => <div className="slide">{children}</div>;

Slide.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

export default Slide;
