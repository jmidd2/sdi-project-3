import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import './scss/index.scss';
// import 'bootstrap/dist/css/bootstrap.css';

import { router } from './components/App/App';

// Entry Point
const root = ReactDOM.createRoot(
  document.getElementById('root'),
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
    </RouterProvider>
  </React.StrictMode>
);
