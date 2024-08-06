import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TonConnectUIProvider } from '@tonconnect/ui-react';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TonConnectUIProvider manifestUrl="https://bankclick-bot.ru/tonconnect-manifest.json">
    <App />
  </TonConnectUIProvider>
);
