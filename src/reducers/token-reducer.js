import get from 'lodash/get';
import { createReducer } from '@reduxjs/toolkit';

import { ActionFailureType, ActionSuccessType, GET_SPORTS, SIGN_IN, SIGN_OUT } from 'constants/redux-actions';

const initState = '1234';

const tokenReducer = createReducer(initState, {
  [ActionSuccessType(SIGN_IN)]: (_, action) => get(action, 'payload.data.token', initState),
  [SIGN_OUT]: () => initState,
  [ActionFailureType(GET_SPORTS)]: () => initState,
});

export default tokenReducer;
