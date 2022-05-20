import { get } from './axios-request-actions';

import { GET_SPORTS_API } from 'constants/api-paths';
import { GET_SPORTS } from 'constants/redux-actions';

const getSports = () => get(GET_SPORTS, GET_SPORTS_API);

const sportActions = { getSports };

export default sportActions;
