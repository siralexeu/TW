import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Stiluri globale
import App from './App'; // Componenta principală
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
