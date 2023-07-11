import React from "react";

const Name: React.FC<{ children: string }> = ({ children }) => (
  <h1 className="name">{children}</h1>
);

export default Name;
