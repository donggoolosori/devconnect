import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from '../../modules';
import Moment from 'react-moment';
import { deleteExperience } from '../../modules/profile';

interface Props {}

export const Experience: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const experience = useSelector(
    (state: rootState) => state.profile.profile!.experience
  );

  const experiences = experience.map((exp: any) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{' '}
        {exp.to === null ? (
          ' Now'
        ) : (
          <Moment format="YYYY/MM/DD">{exp.to}</Moment>
        )}
      </td>
      <td>
        <button
          onClick={() => dispatch(deleteExperience(exp._id))}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </>
  );
};
