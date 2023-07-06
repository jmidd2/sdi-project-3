import React from 'react';
// eslint-disable-next-line import/extensions
import ReactDOM from 'react-dom/client';
import './scss/index.scss';
import App from './components/App/App';
import 'bootstrap/dist/css/bootstrap.css';

// Entry Point
const root = ReactDOM.createRoot(
  document.getElementById('root'),
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
