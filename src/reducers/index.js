import { combineReducers } from 'redux';

import sportsReducer from './sports-reducer';
import tokenReducer from './token-reducer';

export default combineReducers({
  token: tokenReducer,
  sports: sportsReducer,
});
