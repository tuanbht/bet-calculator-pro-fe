import { createAction } from '@reduxjs/toolkit';

import { post } from './axios-request-actions';

import { SIGN_IN, SIGN_OUT } from 'constants/redux-actions';
import { API_SIGN_IN } from 'constants/api-paths';

const signIn = (requestBody = {}) => post(SIGN_IN, API_SIGN_IN, requestBody);

const signOut = () => createAction(SIGN_OUT)();

const authActions = { signIn, signOut };

export default authActions;
