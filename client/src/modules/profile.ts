import { RouteComponentProps } from 'react-router-dom';
import { ThunkAction } from 'redux-thunk';
import { rootState } from '.';
import axios from '../axios';
import { FormData } from '../components/profile-forms/CreateProfile';
import { setAlert } from './alert';

const GET_PROFILE = 'GET_PROFILE' as const;
const PROFILE_ARROR = 'PROFILE_ARROR' as const;
export const CLEAR_PROFILE = 'CLEAR_PROFILE' as const;

// Action type
type ProfileAction =
  | { type: typeof GET_PROFILE; payload: any }
  | {
      type: typeof PROFILE_ARROR;
      payload: {
        msg: string;
        status: number;
      };
    }
  | { type: typeof CLEAR_PROFILE };
type Profile = {
  company: string;
  website: string;
  location: string;
  status: string;
  skills: string;
  githubusername: string;
  bio: string;
  twitter: string;
  facebook: string;
  linkedin: string;
  youtube: string;
  instagram: string;
};

// State type
export type ProfileState = {
  profile: Profile | null;
  profiles: [];
  repos: [];
  loading: boolean;
  error: any;
};

const initialState: ProfileState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

/*Action Creator*/

// Get current profile
export const getCurrentProfile = (): ThunkAction<
  void,
  rootState,
  null,
  ProfileAction
> => async (dispatch) => {
  try {
    const res = await axios.get('/profile/me');

    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    dispatch({
      type: PROFILE_ARROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Clear profile
export const clearProfile = (): ThunkAction<
  void,
  rootState,
  null,
  ProfileAction
> => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
};

interface Props extends RouteComponentProps {}

// Create or Update profile
export const createProfile = (
  formData: FormData,
  edit: boolean = false,
  { history }: Props
): ThunkAction<void, rootState, null, ProfileAction> => async (dispatch) => {
  try {
    const res = await axios.post('/profile', formData);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.message;

    if (errors) {
      if (Array.isArray(errors)) {
        errors.forEach((error: string) => dispatch(setAlert(error, 'danger')));
      } else {
        dispatch(setAlert(errors, 'danger'));
      }
    }

    dispatch({
      type: PROFILE_ARROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

/* Reducer */
function profileReducer(
  state: ProfileState = initialState,
  action: ProfileAction
) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false,
        error: null,
      };
    case PROFILE_ARROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
      };
    default:
      return state;
  }
}

export default profileReducer;
