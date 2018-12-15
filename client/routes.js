import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { presentsRoutes } from 'features/present/routes'
import { authRoutes } from 'features/auth/routes'
import { userRoutes } from 'features/user/routes'
import { Home, NotFound } from './ui/pages'


const routes = [
  ...presentsRoutes(),
  ...authRoutes(),
  ...userRoutes(),
  {
    path: '/',
    component: Home,
  },
  { component: NotFound },
]

export const rootRoutes = () => (
  <React.Fragment>
    {renderRoutes(routes)}
  </React.Fragment>
)

export const redirectTo = (path, key) => () => <Redirect key={key} to={path} />
export const redirectFrom = (from, to) => ({
  path: from,
  exact: true,
  component: redirectTo(to),
});
