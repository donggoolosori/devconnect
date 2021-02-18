import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { rootState } from '../../modules';
import { logout } from '../../modules/auth';

interface Props {}

export const Navbar: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector(
    (state: rootState) => state.auth
  );

  if (!loading) {
    console.log('loading false');
  } else {
    console.log('loading true');
  }
  const authLinks = (
    <ul>
      <li>
        <a onClick={() => dispatch(logout())} href="#!">
          <i className="fas fa-sign-out-alt"></i>{' '}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <a href="#!">Developers</a>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevConnector
        </Link>
      </h1>
      {<>{isAuthenticated ? authLinks : guestLinks}</>}
    </nav>
  );
};
