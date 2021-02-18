import { ThunkAction } from 'redux-thunk';
import { rootState } from '.';
import axios from '../axios';

const GET_PROFILE = 'GET_PROFILE' as const;
const PROFILE_ARROR = 'PROFILE_ARROR' as const;

// Action type
type ProfileAction =
  | { type: typeof GET_PROFILE; payload: any }
  | { type: typeof PROFILE_ARROR; payload: { msg: string; status: string } };

// State type
export type ProfileState = {
  profile: any;
  profiles: [];
  repos: [];
  lading: boolean;
  error: any;
};

const initialState: ProfileState = {
  profile: null,
  profiles: [],
  repos: [],
  lading: true,
  error: {},
};

// Action Creator
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
        msg: err.response.data.message,
        status: err.response.status,
      },
    });
  }
};

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
    default:
      return state;
  }
}

export default profileReducer;
