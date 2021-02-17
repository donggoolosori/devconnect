import axios from '../axios';
import { ThunkAction } from 'redux-thunk';
import { rootState } from '.';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

const REGISTER_SUCCESS = 'REGISTER_SUCCESS' as const;
const REGISTER_FAIL = 'REGISTER_FAIL' as const;
const USER_LOADED = 'USER_LOADED' as const;
const AUTH_ERROR = 'AUTH_ERROR' as const;

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
  | { type: typeof REGISTER_FAIL }
  | { type: typeof USER_LOADED; payload: any }
  | { type: typeof AUTH_ERROR };

/* Action Creators */
// Load User
export const loadUser = (): ThunkAction<
  void,
  rootState,
  null,
  AuthAction
> => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
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
      if (Array.isArray(errors)) {
        errors.forEach((error: string) => dispatch(setAlert(error, 'danger')));
      } else {
        dispatch(setAlert(errors, 'danger'));
      }
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
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
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
    case AUTH_ERROR:
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
