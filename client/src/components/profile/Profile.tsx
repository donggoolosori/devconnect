import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { rootState } from '../../modules';
import { Education, Experience, getProfileById } from '../../modules/profile';
import { Spinner } from '../layout/Spinner';
import { ProfileAbout } from './ProfileAbout';
import { ProfileEducation } from './ProfileEducation';
import { ProfileExperience } from './ProfileExperience';
import { ProfileGithub } from './ProfileGithub';
import { ProfileTop } from './ProfileTop';

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
  }, [dispatch, match]);

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
            auth.user._id === profile.user!._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.experience.length > 0 ? (
                <>
                  {profile.experience.map((exp: Experience) => (
                    <ProfileExperience key={exp._id} experience={exp} />
                  ))}
                </>
              ) : (
                <h4>No experience credentials</h4>
              )}
            </div>
            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                <>
                  {profile.education.map((edu: Education) => (
                    <ProfileEducation key={edu._id} education={edu} />
                  ))}
                </>
              ) : (
                <h4>No Edcuation credentials</h4>
              )}
            </div>
            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
          </div>
        </>
      )}
    </>
  );
};
