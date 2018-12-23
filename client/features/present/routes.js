import { NewPresent, PresentPage, EditPresent } from './pages'


export const presentsRoutes = () => [
  {
    path: '/presents/new',
    exact: true,
    component: NewPresent,
  },
  {
    path: '/present/:id',
    exact: true,
    component: PresentPage,
  },
  {
    path: '/present/:id/edit',
    exact: true,
    component: EditPresent,
  },
];
