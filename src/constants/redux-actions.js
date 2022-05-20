const SUCCESS_SUFFIX = '_SUCCESS';
const FAILURE_SUFFIX = '_FAIL';

export const SIGN_IN = 'SIGN_IN';
export const GET_SPORTS = 'GET_SPORTS';

export const ActionSuccessType = (action) => action.concat(SUCCESS_SUFFIX);

export const ActionFailureType = (action) => action.concat(FAILURE_SUFFIX);
