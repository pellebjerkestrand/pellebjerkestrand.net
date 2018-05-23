import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ children }) => (
  <div className="card">
    <div className="card__image-area">
      <div className="card__dude">
        <img
          src="/assets/metal.jpg"
          alt="Pelle Bjerkestrand, headshot"
          className="card__image"
          title="☠️"
        />
      </div>
    </div>
    <div className="card__content-area">{children}</div>
  </div>
);

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ])
};

export default Card;
