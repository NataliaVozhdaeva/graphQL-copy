import { StrictMode } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Layout } from '@components/layout/layout';
import { SimpleLayout } from '@components/simpleLayout/simpleLayout';
import { AuthorizationPage } from '@pages/auth';
import { Welcome } from '@pages/welcome/welcome';
import { MainPage } from '@pages/main';
import { NotFound } from '@pages/404/notFound';

import './style.css';

const routes = {
  mainPath: '/',
  authPath: '/auth',
  anyOtherPath: '*',
  gpaphiqlPath: '/gpaphiql',
};

const router = createBrowserRouter([
  {
    path: routes.mainPath,
    element: <SimpleLayout />,
    children: [
      { index: true, element: <Welcome /> },
      {
        path: routes.authPath,
        element: <AuthorizationPage />,
      },
      { path: routes.anyOtherPath, element: <NotFound /> },
    ],
  },
  {
    path: routes.mainPath,
    element: <Layout />,
    children: [
      {
        path: routes.gpaphiqlPath,
        element: <MainPage />,
      },
    ],
  },
]);

export function App() {
  return (
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
}
