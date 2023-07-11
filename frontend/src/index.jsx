import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/index.scss';
// import App from './components/App/App';
import 'bootstrap/dist/css/bootstrap.css';
import { RouterProvider } from 'react-router-dom';

import { router } from './components/App/App';

// Entry Point
const root = ReactDOM.createRoot(
  document.getElementById('root'),
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
    </RouterProvider>
  </React.StrictMode>,
);
