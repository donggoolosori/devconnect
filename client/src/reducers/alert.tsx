import { setAlert, removeAlert } from '../actions/types';

type AlertState = {
  id: string;
  msg: string;
  alertType: string;
};

type AlertAction = ReturnType<typeof setAlert> | ReturnType<typeof removeAlert>;

const initialState: AlertState[] = [];

function alertReducer(
  state: AlertState[] = initialState,
  action: AlertAction
): (string | AlertState)[] {
  switch (action.type) {
    case 'SET_ALERT':
      return [...state, action.payload];
    case 'REMOVE_ALERT':
      return state.filter((alert) => alert.id !== action.payload);
    default:
      return state;
  }
}

export default alertReducer;
