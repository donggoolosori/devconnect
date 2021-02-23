import { Match } from '@testing-library/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { rootState } from '../../modules';
import { getProfileById } from '../../modules/profile';
import { Spinner } from '../layout/Spinner';

interface MatchParams {
  id: string;
}

export const Profile: React.FC<RouteComponentProps<MatchParams>> = ({
  match,
}) => {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((state: rootState) => state.profile);
  const auth = useSelector((state: rootState) => state.auth);

  useEffect(() => {
    dispatch(getProfileById(match.params.id));
  }, [dispatch]);

  return (
    <>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
        </>
      )}
    </>
  );
};
