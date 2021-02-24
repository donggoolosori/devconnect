import axios from '../axios';
import { ThunkAction } from 'redux-thunk';
import { rootState } from '.';
import { setAlert } from './alert';

const GET_POSTS = 'GET_POSTS' as const;
const POST_ERROR = 'POST_ERROR' as const;
const UPDATE_LIKES = 'UPDATE_LIKES' as const;
const DELETE_POST = 'DELETE_POST' as const;
const ADD_POST = 'ADD_POST' as const;

type PostAction =
  | { type: typeof GET_POSTS; payload: any }
  | { type: typeof POST_ERROR; payload: any }
  | { type: typeof UPDATE_LIKES; payload: any }
  | { type: typeof DELETE_POST; payload: string }
  | { type: typeof ADD_POST; payload: Post };

export type Like = {
  _id: string;
  user: string;
};

export type Comment = {
  _id: string;
  user: string;
  name: string;
  text: string;
  avatar: string;
  date: string;
};

export type Post = {
  _id: string;
  text: string;
  name: string;
  avatar: string;
  user: string;
  likes: Like[];
  comments: Comment[];
  date: string;
};

export type PostState = {
  posts: Post[];
  post: Post | null;
  loading: boolean;
  error: any;
};

const initialState: PostState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

/* Actions */
// Get posts
export const getPosts = (): ThunkAction<
  void,
  rootState,
  null,
  PostAction
> => async (dispatch) => {
  try {
    const res = await axios.get('/post');

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Add like
export const addLike = (
  post_id: string
): ThunkAction<void, rootState, null, PostAction> => async (dispatch) => {
  try {
    const res = await axios.put(`/post/like/${post_id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { post_id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Remove like
export const removeLike = (
  post_id: string
): ThunkAction<void, rootState, null, PostAction> => async (dispatch) => {
  try {
    const res = await axios.put(`/post/unlike/${post_id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { post_id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Delete post
export const deletePost = (
  post_id: string
): ThunkAction<void, rootState, null, PostAction> => async (dispatch) => {
  try {
    await axios.delete(`/post/${post_id}`);

    dispatch({
      type: DELETE_POST,
      payload: post_id,
    });

    dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    console.log(err);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

// Add post
export const addPost = (formData: {
  text: string;
}): ThunkAction<void, rootState, null, PostAction> => async (dispatch) => {
  try {
    const res = await axios.post(`/post`, formData);

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });

    dispatch(setAlert('Post Created', 'success'));
  } catch (err) {
    console.log(err);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status,
      },
    });
  }
};

/* Reducer */
const postReducer = (state: PostState = initialState, action: PostAction) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.post_id
            ? { ...post, likes: action.payload.likes }
            : post
        ),
        loading: false,
      };
    case DELETE_POST:
      console.log('Delete post reducer');
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default postReducer;
