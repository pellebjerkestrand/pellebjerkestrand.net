import React from "react";
import ReactDOMServer from "react-dom/server";

import Html from "./components/html";
import Home from "./pages/home";

export const render = ({ css, title }) =>
  `<!doctype html>${ReactDOMServer.renderToString(
    <Html css={css} title={title}>
      <Home />
    </Html>
  )}`;
