import { combineReducers } from 'redux';
import alert from './alert';

export default combineReducers({
  alert,
});

export type RootState = ReturnType<typeof combineReducers>;
