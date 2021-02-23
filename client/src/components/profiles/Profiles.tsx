import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from '../../modules';
import { getProfiles } from '../../modules/profile';
import { Spinner } from '../layout/Spinner';
import { ProfileItem } from './ProfileItem';

interface Props {}

export const Profiles: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const { loading, profiles } = useSelector(
    (state: rootState) => state.profile
  );

  useEffect(() => {
    dispatch(getProfiles());
  }, [dispatch]);

  return (
    <>
      <>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <h1 className="large text-primary">Developers</h1>
            <p className="lead">
              <i className="fab fa-connectdevelop" /> Browse and connect with
              developers
            </p>
            <div className="profiles">
              {profiles.length > 0 ? (
                profiles.map((profile: any) => (
                  <ProfileItem key={profile._id} profile={profile} />
                ))
              ) : (
                <h4>No profiles found...</h4>
              )}
            </div>
          </>
        )}
      </>
    </>
  );
};
