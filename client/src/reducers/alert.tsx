import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

interface State {
  id: string;
  msg: string;
  alertType: string;
}

type Action =
  | { type: 'SET_ALERT'; payload: string }
  | { type: 'REMOVE_ALERT'; payload: string };

function alertReducer(state: State[], action: Action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}

export default alertReducer;
