import React from "react";

const Link: React.FC<{
  icon?: string;
  text: string;
  url: string;
}> = ({ icon, text, url }) => (
  <a className="link" href={url}>
    {icon && <span className="link__icon">{icon}</span>}
    <span className="link__text">{text}</span>
  </a>
);

export default Link;
