import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import sportActions from 'actions/sport-actions';
import { useIsAuthenticated } from 'hooks';

const PreparingData = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    isAuthenticated && dispatch(sportActions.getSports());
  }, [dispatch, isAuthenticated]);

  return null;
};

export default PreparingData;
