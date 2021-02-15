import { ThunkAction } from 'redux-thunk';
import { uuid } from 'uuidv4';
import { RootState } from '.';

const SET_ALERT = 'SET_ALERT' as const;
const REMOVE_ALERT = 'REMOVE_ALERT' as const;

export const setAlert = (
  msg: string,
  alertType: string
): ThunkAction<void, RootState, null, AlertAction> => async (dispatch) => {
  const id: string = uuid();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });
};
export const removeAlert = (id: string) => ({
  type: REMOVE_ALERT,
  payload: id,
});

type AlertState = {
  id: string;
  msg: string;
  alertType: string;
};

type AlertAction =
  | { type: 'SET_ALERT'; payload: AlertState }
  | { type: 'REMOVE_ALERT'; payload: string };

const initialState: AlertState[] = [];

function alertReducer(state: AlertState[] = initialState, action: AlertAction) {
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
