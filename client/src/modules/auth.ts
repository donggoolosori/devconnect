import axios from '../axios';
import { ThunkAction } from 'redux-thunk';
import { rootState } from '.';
import { setAlert } from './alert';

const REGISTER_SUCCESS = 'REGISTER_SUCCESS' as const;
const REGISTER_FAIL = 'REGISTER_FAIL' as const;

export type AuthState = {
  token: string | null;
  isAuthenticated: boolean | null;
  loading: boolean;
  user: any;
};

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};

// Action type
type AuthAction =
  | { type: typeof REGISTER_SUCCESS; payload: { token: string } }
  | { type: typeof REGISTER_FAIL };

// Action Creator
export const register = (
  name: string,
  email: string,
  password: string
): ThunkAction<void, rootState, null, AuthAction> => async (dispatch) => {
  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/users', body);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    console.log('Register Success');
  } catch (err) {
    const errors = err.response.data.message;
    console.log(errors);
    if (errors) {
      errors.forEach((error: string) => dispatch(setAlert(error, 'danger')));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Reducer
function authReducer(
  state: AuthState = initialState,
  action: AuthAction
): AuthState {
  switch (action.type) {
    case REGISTER_SUCCESS:
      const { payload } = action;
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}

export default authReducer;
