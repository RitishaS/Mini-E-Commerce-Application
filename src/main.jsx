import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './state/CartContext.jsx';
import App from './App.jsx';
import './styles.css';
import './loading.css';
import './product-loading.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode><BrowserRouter><CartProvider><App /></CartProvider></BrowserRouter></React.StrictMode>
);
