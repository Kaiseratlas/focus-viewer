import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';
import { Provider } from 'react-redux';
import { FocusStyleManager } from '@blueprintjs/core';
import { ErrorBoundary } from 'react-error-boundary';

import App from './app/App';
import reportWebVitals from './reportWebVitals';
import { store } from './app/store';

FocusStyleManager.onlyShowFocusOnTabs();

ReactDOM.render(
  <ErrorBoundary
    FallbackComponent={({ error, resetErrorBoundary }) => null}
    onError={(error) => {
      console.log('error', error)
    }}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
