import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { presentsRoutes } from 'features/present/routes';
import { authRoutes } from 'features/auth/routes';
import { userRoutes } from 'features/user/routes';
import { Route, Switch } from 'react-router';
import { HomePage, NotFoundPage } from 'features/common';


const routes = [
  ...presentsRoutes(),
  ...authRoutes(),
  ...userRoutes(),
  {
    path: '/',
    component: HomePage,
    exact: true,
  },
  { component: NotFoundPage },
];

export const rootRoutes = () => (
  <React.Fragment>
    <Switch>
      {
        routes.map(route => <Route key={route.key} {...route} />)
      }
    </Switch>
  </React.Fragment>
);

export const redirectTo = (path, key) => () => <Redirect key={key} to={path} />;

export const redirectFrom = (from, to) => ({
  path: from,
  exact: true,
  component: redirectTo(to),
});
