import get from 'lodash/get';
import { createReducer } from '@reduxjs/toolkit';

import { ActionSuccessType, GET_SPORTS } from 'constants/redux-actions';

const initState = [];

const sportsReducer = createReducer(initState, {
  [ActionSuccessType(GET_SPORTS)]: (_, action) => get(action, 'payload.data', initState),
});

export default sportsReducer;
