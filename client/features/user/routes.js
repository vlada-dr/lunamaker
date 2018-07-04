import {
  EditUser,
  Profile,
  Offers,
  Likes,
  Friends,
  AuthHOC,
} from 'features'


export const userRoutes = () => [
  {
    path: '/edit/:section',
    exact: true,
    component: AuthHOC(EditUser),
  },
  {
    path: '/id:id/offers',
    exact: true,
    component: Offers,
  },
  {
    path: '/id:id',
    exact: true,
    component: AuthHOC(Profile),
  },
  {
    path: '/id:id/likes',
    exact: true,
    component: Likes,
  },
  {
    path: '/id:id/friends',
    exact: true,
    component: Friends,
  },
]
