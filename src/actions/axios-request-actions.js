import { createAction } from '@reduxjs/toolkit';

export const get = (action, url, params = {}, configs = {}) =>
  createAction(action, () => ({
    payload: {
      request: {
        method: 'get',
        url,
        params,
        ...configs,
      },
    },
  }))();
