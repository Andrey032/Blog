import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import 'normalize.css';
import App from './components/App';
import { Provider } from 'react-redux';
import store from './features/store';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
