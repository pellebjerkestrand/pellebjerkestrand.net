import React from "react";

const LinkItems: React.FC<React.PropsWithChildren> = ({ children }) => (
  <ul className="links">
    {React.Children.map(children, (child, index) => (
      <li className="links__item" key={index}>
        {child}
      </li>
    ))}
  </ul>
);

export default LinkItems;
