import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Modal from 'react-modal';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import 'react-responsive-modal/styles.css';
import 'react-tippy/dist/tippy.css'

Modal.setAppElement('#root');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60 * 2000
    }
  }
})


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </Router>
  </Provider>,

  document.getElementById('root'),
);

reportWebVitals();
