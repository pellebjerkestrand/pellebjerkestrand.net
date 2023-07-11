import React from "react";

const Slide: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="slide">{children}</div>
);

export default Slide;
