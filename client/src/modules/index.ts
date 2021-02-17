import { combineReducers } from 'redux';
import alert, { AlertState } from './alert';
import auth, { AuthState } from './auth';

export default combineReducers({
  alert,
  auth,
});

export type rootState = {
  alert: AlertState[];
  auth: AuthState;
};
