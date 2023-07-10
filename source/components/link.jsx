import React from "react";

const Link = ({ icon, text, url }) => (
  <a className="link" href={url}>
    {icon && <span className="link__icon">{icon}</span>}
    <span className="link__text">{text}</span>
  </a>
);

export default Link;
