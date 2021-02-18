import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from '../../modules';
import { getCurrentProfile } from '../../modules/profile';

interface Props {}

export const Dashboard: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: rootState) => state.auth);
  const profile = useSelector((state: rootState) => state.profile);

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  return <div className="Dashboard">Dashboard</div>;
};
