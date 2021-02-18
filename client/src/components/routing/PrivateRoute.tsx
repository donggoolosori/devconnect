import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { rootState } from '../../modules';
import { Spinner } from '../layout/Spinner';

export const PrivateRoute: React.FC<any> = ({ Component, ...rest }) => {
  const { isAuthenticated, loading } = useSelector(
    (state: rootState) => state.auth
  );
  return (
    <Route
      {...rest}
      render={(props) =>
        loading ? (
          <Spinner />
        ) : isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
