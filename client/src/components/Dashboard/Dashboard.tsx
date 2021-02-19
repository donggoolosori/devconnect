import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { rootState } from '../../modules';
import { getCurrentProfile } from '../../modules/profile';
import { Spinner } from '../layout/Spinner';
import { DashboardActions } from './DashboardAction';

interface Props {}

export const Dashboard: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: rootState) => state.auth);
  const { profile, loading } = useSelector((state: rootState) => state.profile);

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, [dispatch]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <>
          <DashboardActions />
        </>
      ) : (
        <>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </>
      )}
    </>
  );
};
