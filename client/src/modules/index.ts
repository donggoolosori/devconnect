import { combineReducers } from 'redux';
import alert, { AlertState } from './alert';

export default combineReducers({
  alert,
});

export type rootState = {
  alert: AlertState[];
};
