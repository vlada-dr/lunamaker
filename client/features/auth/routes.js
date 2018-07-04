import { Login } from 'features'


export const authRoutes = () => [
  {
    path: '/login',
    exact: true,
    component: Login,
  },
]
