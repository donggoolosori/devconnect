import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { rootState } from '../../modules';
import { deleteAccount, getCurrentProfile } from '../../modules/profile';
import { Spinner } from '../layout/Spinner';
import { DashboardActions } from './DashboardAction';
import { Education } from './Education';
import { Experience } from './Experience';

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
          <Experience />
          <Education />
          <div className="my-2">
            <button
              className="btn btn-danger"
              onClick={() => dispatch(deleteAccount())}
            >
              <i className="fas fa-user-minus"></i>Delete My Account
            </button>
          </div>
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
