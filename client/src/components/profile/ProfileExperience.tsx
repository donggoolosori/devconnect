import React from 'react';
import Moment from 'react-moment';
import { Experience } from '../../modules/profile';

interface Props {
  experience: Experience;
}

export const ProfileExperience: React.FC<Props> = ({ experience }) => {
  const { company, title, to, from, description } = experience;
  return (
    <div className="ProfileExperience">
      <h3 className="text-dark">{company}</h3>
      <p>
        <Moment format="YYYY/MM/DD">{from}</Moment> -{' '}
        {!to ? ' Now' : <Moment format="YYYY/MM/DD">{to}</Moment>}
      </p>
      <p>
        <strong>Position : </strong>
        {title}
      </p>
      <p>
        <strong>Description: </strong>
        {description}
      </p>
    </div>
  );
};
