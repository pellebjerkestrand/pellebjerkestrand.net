import React from 'react';
import PropTypes from 'prop-types';

const LinkItems = ({ children }) => (
  <ul className="link-items">
    {React.Children.map(children, (child, index) => (
      <li className="link-items__item" key={child.id || index}>
        {child}
      </li>
    ))}
  </ul>
);

LinkItems.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

export default LinkItems;
