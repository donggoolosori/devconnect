import { RouteComponentProps } from 'react-router-dom';
import { ThunkAction } from 'redux-thunk';
import { rootState } from '.';
import axios from '../axios';
import { EduFormData } from '../components/profile-forms/AddEducation';
import { ExpFormData } from '../components/profile-forms/AddExperience';
import { FormData } from '../components/profile-forms/CreateProfile';
import { setAlert } from './alert';
import { dispatchAccountDeleted } from './auth';

const GET_PROFILE = 'GET_PROFILE' as const;
const GET_PROFILES = 'GET_PROFILES' as const;
const PROFILE_ARROR = 'PROFILE_ARROR' as const;
const CLEAR_PROFILE = 'CLEAR_PROFILE' as const;
const UPDATE_PROFILE = 'UPDATE_PROFILE' as const;
const GET_REPOS = 'GET_REPOS' as const;
const GITHUB_REPOS_ARROR = 'GITHUB_REPOS_ARROR' as const;

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
  | { type: typeof CLEAR_PROFILE }
  | { type: typeof UPDATE_PROFILE; payload: any }
  | { type: typeof GET_PROFILES; payload: any }
  | { type: typeof GET_REPOS; payload: any }
  | { type: typeof GITHUB_REPOS_ARROR; payload: any };

export type Experience = {
  current: boolean;
  _id: string;
  title: string;
  company: string;
  location: string;
  from: string;
  to: string | null;
  description: string;
};

export type Education = {
  _id: string;
  current: boolean;
  school: string;
  degree: string;
  fieldofstudy: string;
  from: string;
  to: string;
  description: string;
};

export type Profile = {
  company: string;
  user: {
    _id: string;
    name: string;
    avatar: string;
  };
  website: string;
  location: string;
  status: string;
  skills: any;
  githubusername: string;
  bio: string;
  social: {
    youtube: string | null;
    twitter: string | null;
    instagram: string | null;
    linkedin: string | null;
    facebook: string | null;
  } | null;
  twitter: string;
  facebook: string;
  linkedin: string;
  youtube: string;
  instagram: string;
  experience: [Experience];
  education: [Education];
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

// Get All profiles
export const getProfiles = (): ThunkAction<
  void,
  rootState,
  null,
  ProfileAction
> => async (dispatch) => {
  try {
    dispatch(clearProfile());

    const res = await axios.get('/profile');

    dispatch({ type: GET_PROFILES, payload: res.data });
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

// Get profile by id
export const getProfileById = (
  id: string
): ThunkAction<void, rootState, null, ProfileAction> => async (dispatch) => {
  try {
    const res = await axios.get(`/profile/user/${id}`);

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

// Get github repos
export const getGithubRepos = (
  username: string
): ThunkAction<void, rootState, null, ProfileAction> => async (dispatch) => {
  try {
    const res = await axios.get(`/profile/github/${username}`);

    dispatch({ type: GET_REPOS, payload: res.data });
  } catch (err) {
    dispatch({
      type: GITHUB_REPOS_ARROR,
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

// Add Experience
export const addExperience = (
  formData: ExpFormData,
  { history }: Props
): ThunkAction<void, rootState, null, ProfileAction> => async (dispatch) => {
  try {
    const res = await axios.put('/profile/experience', formData);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Experience Added', 'success'));

    history.push('/dashboard');
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

// Add Education
export const addEducation = (
  formData: EduFormData,
  { history }: Props
): ThunkAction<void, rootState, null, ProfileAction> => async (dispatch) => {
  try {
    const res = await axios.put('/profile/education', formData);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Education Added', 'success'));

    history.push('/dashboard');
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

// Delete experience
export const deleteExperience = (
  id: string
): ThunkAction<void, rootState, null, ProfileAction> => async (dispatch) => {
  try {
    const res = await axios.delete(`/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Experience Removed', 'success'));
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

// Delete education
export const deleteEducation = (
  id: string
): ThunkAction<void, rootState, null, ProfileAction> => async (dispatch) => {
  try {
    const res = await axios.delete(`/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Education Removed', 'success'));
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

// Delete account & profile
export const deleteAccount = (): ThunkAction<
  void,
  rootState,
  null,
  ProfileAction
> => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete(`/profile`);

      dispatch({ type: CLEAR_PROFILE });
      dispatch(dispatchAccountDeleted());

      dispatch(setAlert('Your Account has been permanantly deleted', ''));
    } catch (err) {
      const errors = err.response.data.message;

      if (errors) {
        if (Array.isArray(errors)) {
          errors.forEach((error: string) =>
            dispatch(setAlert(error, 'danger'))
          );
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
  }
};

/* Reducer */
function profileReducer(
  state: ProfileState = initialState,
  action: ProfileAction
) {
  switch (action.type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false,
        error: null,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false,
      };
    case GET_REPOS:
      return {
        ...state,
        loading: false,
        repos: action.payload,
      };
    case PROFILE_ARROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        profile: null,
      };
    case GITHUB_REPOS_ARROR:
      return {
        ...state,
        repos: [],
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
