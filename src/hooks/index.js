import isEmpty from 'lodash/isEmpty';
import { useSelector } from 'react-redux';

export const useIsAuthenticated = () => useSelector((state) => !isEmpty(state.token));
