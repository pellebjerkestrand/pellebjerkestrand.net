import React from 'react';
import PropTypes from 'prop-types';

const Name = ({ children }) => <h1 className="name">{children}</h1>;

Name.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

export default Name;
