import axios from '../axios';
import { ThunkAction } from 'redux-thunk';
import { rootState } from '.';

const GET_POSTS = 'GET_POSTS' as const;
const POST_ERROR = 'POST_ERROR' as const;
const UPDATE_LIKES = 'UPDATE_LIKES' as const;

type PostAction =
  | { type: typeof GET_POSTS; payload: any }
  | { type: typeof POST_ERROR; payload: any }
  | { type: typeof UPDATE_LIKES; payload: any };

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

/* Reducer */
const postReducer = (state: PostState = initialState, action: PostAction) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
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
