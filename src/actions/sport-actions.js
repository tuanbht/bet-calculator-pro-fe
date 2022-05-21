import { get } from './axios-request-actions';

import { API_GET_SPORTS } from 'constants/api-paths';
import { GET_SPORTS } from 'constants/redux-actions';

const getSports = () => get(GET_SPORTS, API_GET_SPORTS);

const sportActions = { getSports };

export default sportActions;
