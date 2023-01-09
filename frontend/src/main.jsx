import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import DigitalBankProvider from './context/digitalProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <DigitalBankProvider>
      <App />
    </DigitalBankProvider>
  </BrowserRouter>
);
