import React from 'react';
import Moment from 'react-moment';
import { Education } from '../../modules/profile';

interface Props {
  education: Education;
}

export const ProfileEducation: React.FC<Props> = ({ education }) => {
  const { school, degree, fieldofstudy, to, from, description } = education;
  return (
    <div className="ProfileEducation">
      <h3 className="text-dark">{school}</h3>
      <p>
        <Moment format="YYYY/MM/DD">{from}</Moment> -{' '}
        {!to ? ' Now' : <Moment format="YYYY/MM/DD">{to}</Moment>}
      </p>
      <p>
        <strong>Degree : </strong>
        {degree}
      </p>
      <p>
        <strong>Field of Study : </strong>
        {fieldofstudy}
      </p>
      <p>
        <strong>Description: </strong>
        {description}
      </p>
    </div>
  );
};
