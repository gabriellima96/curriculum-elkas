import React from 'react';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';

import { isAuthenticated } from './services/auth';
import Main from './pages/main';
import Dashboard from './pages/dashboard';
import Templates from './pages/templates';
import Settings from './pages/settings';
import ModernForm from './pages/modernForm';
import ModernFormulario from './pages/modernFormulario';

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
  const {
    match: { params },
  } = props;

  if (params.id.startsWith('1m')) {
    return <ModernForm {...props} />;
  }

  if (params.id.startsWith('1c')) {
    return <h1>Hello</h1>;
  }

  return <h1>Não foi encontrado nenhum curriculum com esse id</h1>;
}

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <RouteDefaults exact path="/" component={Main} />
      <PrivateRoute exact path="/app" component={Dashboard} />
      <PrivateRoute exact path="/app/settings" component={Settings} />
      <PrivateRoute exact path="/app/templates" component={Templates} />
      <PrivateRoute exact path="/app/templates/modern" component={ModernFormulario} />
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
