import React from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';

import { isAuthenticated } from './services/auth';
import { verifyCurriculum } from './services/verifyCurriculum';
import Main from './pages/main';
import Dashboard from './pages/dashboard';
import Templates from './pages/templates';
import Settings from './pages/settings';
import ModernForm from './pages/modernForm';

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

const RouteVerifyCurriculum = ({ ...rest }) => (
  <Route {...rest} component={props => verifyCurriculum(props)} />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <RouteDefaults exact path="/" component={Main} />
      <PrivateRoute exact path="/app" component={Dashboard} />
      <PrivateRoute exact path="/app/settings" component={Settings} />
      <PrivateRoute exact path="/app/templates" component={Templates} />
      <PrivateRoute exact path="/app/templates/modern" component={ModernForm} />
      <PrivateRoute
        exact
        path="/app/templates/classic"
        component={() => <h1>Currículo clássic</h1>}
      />
      <RouteVerifyCurriculum exact path="/:id" />
    </Switch>
  </BrowserRouter>
);

export default Routes;
