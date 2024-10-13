import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import './index.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Root from './routes/root.tsx';
import About from './routes/about.tsx';
import Layout from './Layout.tsx';
import Tags from './routes/tags.tsx';
import { Provider } from 'react-redux';
import store from './app/store.ts';

// This way is of setting up react-router-dom is based on the official documentation of v6.26.2

const router = createBrowserRouter([
  {
    path: '/', // Base path for the layout
    element: <Layout />, // Use Layout as the element
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
