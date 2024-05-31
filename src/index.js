import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

async function enableMocking() {

  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('./mocks/browser');
  await worker.start({
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
  });
}

enableMocking().then(() => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
      <App />
  );
});

reportWebVitals();