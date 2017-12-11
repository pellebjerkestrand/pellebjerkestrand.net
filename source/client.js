import 'babel-polyfill';
import 'react';
import 'react-dom';

// NOTE: For some reason, exposing in this old way works on the server and client while using the newer syntax in the Webpack configuration file only works on the client >.<
import 'expose-loader?Components!./app.components';
