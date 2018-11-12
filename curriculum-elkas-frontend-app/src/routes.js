import React, { Fragment } from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import HeaderApp from './components/HeaderApp';

import { isAuthenticated } from './services/auth';
import Main from './pages/main';
import Dashboard from './pages/dashboard';
import Templates from './pages/templates';
import Settings from './pages/settings';
import ModernForm from './pages/modernForm';
import CurriculumGenerated from './components/CurriculumGenerated';

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

function verifyTemplate(props) {
  if (props.match.params.id === '1m') {
    return <ModernForm {...props} />;
  }

  if (props.match.params.id === '1c') {
    return <h1>Hello</h1>;
  }
}

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
      <Route exact path="/:id" component={verifyTemplate} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
