import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { PrivatRoute } from './components/PrivatRoute';

const Home = lazy(() => import('./pages/Home.page'));
const Characters = lazy(() => import('./pages/Characters.page'));
const Locations = lazy(() => import('./pages/Locations.page'));
const Episodes = lazy(() => import('./pages/Episodes.page'));
const Card = lazy(() => import('./pages/Card.page'));
const Login = lazy(() => import('./pages/Login.page'));
const Registration = lazy(() => import('./pages/Registration.page'));
const Error = lazy(() => import('./pages/Error.page'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        element: <PrivatRoute />,
        children: [
          {
            path: 'characters',
            element: <Characters />,
          },
          {
            path: 'characters/:id',
            element: <Card type='characters' />,
          },
          {
            path: 'locations',
            element: <Locations />,
          },
          {
            path: 'locations/:id',
            element: <Card type='locations' />,
          },
          {
            path: 'episodes',
            element: <Episodes />,
          },
          {
            path: 'episodes/:id',
            element: <Card type='episodes' />,
          },
        ],
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'registration',
        element: <Registration />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
