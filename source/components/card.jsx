import React from "react";

import image from "../assets/metal.jpg";

const Card = ({ children }) => (
  <div className="card">
    <div className="card__image-area">
      <div className="card__dude">
        <img
          src={image}
          alt="Pelle Bjerkestrand, headshot"
          className="card__image"
        />
      </div>
    </div>
    <div className="card__content-area">{children}</div>
  </div>
);

export default Card;
