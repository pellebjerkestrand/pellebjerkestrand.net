import React from "react";

const Title: React.FC<{ children: string }> = ({ children }) => (
  <h2 className="title">{children}</h2>
);

export default Title;
