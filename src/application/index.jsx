import React from 'react';
import { Router as BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import RouterConfiguration from 'configurations/router';
import { history, persistor, store } from 'configurations/redux-store';
import PrepareData from 'components/preparing-data';

const Application = () => (
  <BrowserRouter history={history}>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <PrepareData />
        <RouterConfiguration />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);

export default Application;
