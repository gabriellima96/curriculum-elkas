import React from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';

import { isAuthenticated } from './services/auth';
import Main from './pages/main';
import Dashboard from './pages/dashboard';
import Templates from './pages/templates';
import Settings from './pages/settings';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (isAuthenticated() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    ))
    }
  />
);

const RouteDefaults = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (!isAuthenticated() ? (
      <Component {...props} />
    ) : (
      <Redirect to={{ pathname: '/app', state: { from: props.location } }} />
    ))
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <RouteDefaults exact path="/" component={Main} />
      <PrivateRoute exact path="/app" component={Dashboard} />
      <PrivateRoute exact path="/app/settings" component={Settings} />
      <PrivateRoute exact path="/app/templates" component={Templates} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
