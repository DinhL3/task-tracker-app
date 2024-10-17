import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import store from './app/store.ts';
import Layout from './Layout.tsx';
import About from './routes/about.tsx';
import Root from './routes/root.tsx';
import Tags from './routes/tags.tsx';
import TaskDetails from './routes/task-details.tsx';
import ErrorPage from './components/ErrorPage/ErrorPage.tsx';

// This way is of setting up react-router-dom is based on the official documentation of v6.26.2

const router = createBrowserRouter([
  {
    path: '/', // Base path for the layout
    element: <Layout />, // Use Layout as the element
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Root />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'tags',
        element: <Tags />,
      },
      {
        path: 'tasks/:taskId',
        element: <TaskDetails />,
      },
      // {
      //   path: 'task/new',
      //   element: <EditTask />,
      // },

      // {
      //   path: 'task/:id/edit',
      //   element: <EditTask />,
      // },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
