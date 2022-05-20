import get from 'lodash/get';
import { createReducer } from '@reduxjs/toolkit';

import { ActionSuccessType, SIGN_IN } from 'constants/redux-actions';

// FIXME should be empty
const initState = 'token';

const tokenReducer = createReducer(initState, {
  [ActionSuccessType(SIGN_IN)]: (_, action) => get(action, 'payload.data', initState),
});

export default tokenReducer;
