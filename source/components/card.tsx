import React from "react";

import image from "../assets/metal.jpg";

const Card: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="card">
    <div className="card__dude">
      <img
        src={image}
        alt="Pelle Bjerkestrand, headshot"
        className="card__image"
      />
    </div>
    <div>{children}</div>
  </div>
);

export default Card;
