import { ThunkAction } from 'redux-thunk';
import { v4 as uuidv4 } from 'uuid';
import { rootState } from '.';

// Action name
const SET_ALERT = 'SET_ALERT' as const;
const REMOVE_ALERT = 'REMOVE_ALERT' as const;

// Action Creator
export const setAlert = (
  msg: string,
  alertType: string,
  timeout = 5000
): ThunkAction<void, rootState, null, AlertAction> => async (dispatch) => {
  const id: string = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  setTimeout(() => dispatch(removeAlert(id)), timeout);
};
export const removeAlert = (id: string) => ({
  type: REMOVE_ALERT,
  id,
});

// State type
export type AlertState = {
  id: string;
  msg: string;
  alertType: string;
};

// Action type
type AlertAction =
  | { type: typeof SET_ALERT; payload: AlertState }
  | { type: typeof REMOVE_ALERT; id: string };

const initialState: AlertState[] = [];

// Reducer
function alertReducer(
  state: AlertState[] = initialState,
  action: AlertAction
): AlertState[] {
  switch (action.type) {
    case 'SET_ALERT':
      return [...state, action.payload];
    case 'REMOVE_ALERT':
      return state.filter((alert) => alert.id !== action.id);
    default:
      return state;
  }
}

export default alertReducer;
