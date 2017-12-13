import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ children }) => <h2 className="title">{children}</h2>;

Title.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

export default Title;
