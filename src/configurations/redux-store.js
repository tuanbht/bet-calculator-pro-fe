import axiosMiddleware from 'redux-axios-middleware';
import get from 'lodash/get';
import merge from 'lodash/merge';
import { createBrowserHistory } from 'history';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import axiosClient from './api-client';

import rootReducer from 'reducers';

const history = createBrowserHistory();

const persistConfig = {
  key: `${process.env.REACT_APP_WEBAPP_NAME}`,
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const axiosMiddlewareConfig = {
  interceptors: {
    request: [
      ({ getState }, request) => {
        const token = get(getState(), 'auth.token');
        if (token) {
          merge(request, { headers: { Authorization: `Bearer ${token}` } });
        }

        return request;
      },
    ],
  },
};

const middleware = (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(axiosMiddleware(axiosClient, axiosMiddlewareConfig));

const store = configureStore({
  reducer: persistedReducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

const persistor = persistStore(store);

export { history, store, persistor };
