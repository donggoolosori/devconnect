import { combineReducers } from 'redux';
import alert, { AlertState } from './alert';
import auth, { AuthState } from './auth';
import profile, { ProfileState } from './profile';

export default combineReducers({
  alert,
  auth,
  profile,
});

export type rootState = {
  alert: AlertState[];
  auth: AuthState;
  profile: ProfileState;
};
