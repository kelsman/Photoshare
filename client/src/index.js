import React from 'react';
import ReactDOM from 'react-dom';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Modal from 'react-modal';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import { Provider } from 'react-redux';
import 'react-responsive-modal/styles.css';
import { BrowserRouter as Router } from 'react-router-dom';
import 'react-tippy/dist/tippy.css';
import App from './App';
import './index.scss';
import store from './redux/store';
import reportWebVitals from './reportWebVitals';


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
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Router>
  </Provider>,

  document.getElementById('root'),
);

reportWebVitals();
