import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Cv from './cv';
import Home from './home';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/cv" component={Cv} />
  </Switch>
);

export default Routes;
