import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Modal from 'react-modal';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

import 'react-responsive-modal/styles.css';

Modal.setAppElement('#root');

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,

  document.getElementById('root'),
);

reportWebVitals();
