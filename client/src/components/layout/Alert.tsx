import React from 'react';
import { useSelector } from 'react-redux';
import { rootState } from '../../modules';

interface Props {}

export const Alert: React.FC<Props> | any = () => {
  const alerts = useSelector((state: rootState) => state.alert);
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>
    ))
  );
};
