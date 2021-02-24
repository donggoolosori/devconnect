import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from '../../modules';
import { getGithubRepos } from '../../modules/profile';
import { Spinner } from '../layout/Spinner';

interface Props {
  username: string;
}

export const ProfileGithub: React.FC<Props> = ({ username }) => {
  const dispatch = useDispatch();
  const repos = useSelector((state: rootState) => state.profile.repos);

  useEffect(() => {
    dispatch(getGithubRepos(username));
  }, [dispatch, username]);

  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">Github Repos</h2>
      {repos === null ? (
        <Spinner />
      ) : (
        repos.map((repos: any) => (
          <div key={repos.id} className="repo bg-white p-1 my-1">
            <div>
              <h4>
                <a
                  href={repos.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repos.name}
                </a>
              </h4>
              <p>{repos.description}</p>
            </div>
            <div>
              <ul>
                <li className="badge badge-primary">
                  Stars:{repos.stargazers_count}
                </li>
                <li className="badge badge-primary">
                  Watchers:{repos.watchers_count}
                </li>
                <li className="badge badge-primary">
                  Forks:{repos.forks_count}
                </li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
