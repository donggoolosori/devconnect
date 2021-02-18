import React from 'react';
import spinner from '../../img/spinner.gif';
interface Props {}

export const Spinner: React.FC<Props> = () => {
  return (
    <img
      src={spinner}
      style={{ width: '200px', margin: 'auto', display: 'block' }}
      alt="Loading..."
    />
  );
};
