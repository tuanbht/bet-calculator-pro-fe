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

export const post = (action, url, data = {}, configs = {}) =>
  createAction(action, () => ({
    payload: {
      request: {
        method: 'post',
        url,
        data,
        ...configs,
      },
    },
  }))();
