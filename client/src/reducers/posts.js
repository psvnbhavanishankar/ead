import {
  GET_POSTS,
  GET_POST_BY_ID,
  GET_POST_BY_ID_2,
  POST_POST,
  UPDATE_POST,
  DELETE_POST,
  POSTS_ERROR,
} from '../actions/types';

const initialState = {
  post: null,
  posts: [],
  loading: true,
  error: {},
  post_post: null,
  get_post: null,
  get_post_2: null,
  get_posts: null,
  update_post: null,
  delete_post: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        get_posts: true,
        loading: false,
      };
    case GET_POST_BY_ID:
      return {
        ...state,
        post: payload,
        getpost: true,
        loading: false,
      };
    case GET_POST_BY_ID_2:
      return {
        ...state,
        post: payload,
        get_post_2: true,
        loading: false,
      };
    case POST_POST:
      return {
        ...state,
        post: payload,
        post_post: true,
        loading: false,
      };
    case UPDATE_POST:
      return {
        ...state,
        post: payload,
        update_post: true,
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        delete_post: true,
        loading: false,
      };
    case POSTS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
