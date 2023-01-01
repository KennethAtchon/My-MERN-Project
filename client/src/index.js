import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
//import { compose } from 'redux';
import App from './App.js';
import store from './store';
import { persistor } from './store';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

