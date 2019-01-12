import {
  NewPresent, PresentPage, EditPresent, PresentsTable,
} from './pages';


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
  {
    path: '/admin',
    exact: true,
    component: PresentsTable,
  },
];
