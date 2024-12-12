import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import 'normalize.css';
import App from './components/App';
import { Provider } from 'react-redux';
import store from './features/store';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
