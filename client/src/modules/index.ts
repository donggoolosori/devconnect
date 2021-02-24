import { combineReducers } from 'redux';
import alert, { AlertState } from './alert';
import auth, { AuthState } from './auth';
import profile, { ProfileState } from './profile';
import post, { PostState } from './post';

export default combineReducers({
  alert,
  auth,
  profile,
  post,
});

export type rootState = {
  alert: AlertState[];
  auth: AuthState;
  profile: ProfileState;
  post: PostState;
};
