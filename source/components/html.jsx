import React from "react";

const Html = ({ children, css, title }) => (
  <html>
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title}</title>
      <style>{css}</style>
    </head>
    <body>{children}</body>
  </html>
);

export default Html;
