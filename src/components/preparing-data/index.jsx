import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import sportActions from 'actions/sport-actions';

const PreparingData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sportActions.getSports());
  }, [dispatch]);

  return null;
};

export default PreparingData;
