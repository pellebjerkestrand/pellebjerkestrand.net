import React from "react";

const LinkItems = ({ children }) => (
  <ul className="links">
    {React.Children.map(children, (child, index) => (
      <li className="links__item" key={child.id || index}>
        {child}
      </li>
    ))}
  </ul>
);

export default LinkItems;
