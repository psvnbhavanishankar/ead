import {
  GET_COMMENTS,
  GET_COMMENTS_2,
  POST_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  COMMENTS_ERROR,
} from '../actions/types';

const initialState = {
  comment: null,
  comments: [],
  loading: true,
  error: {},
  post_comment: null,
  get_comments: null,
  get_comments_2: null,
  update_comment: null,
  delete_comment: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: payload,
        get_comments: true,
        loading: false,
      };
    case GET_COMMENTS_2:
      return {
        ...state,
        comments: payload,
        get_comments_2: true,
        loading: false,
      };
    case POST_COMMENT:
      return {
        ...state,
        comment: payload,
        post_comment: true,
        loading: false,
      };
    case UPDATE_COMMENT:
      return {
        ...state,
        comment: payload,
        update_comment: true,
        loading: false,
      };
    case DELETE_COMMENT:
      return {
        ...state,
        delete_comment: true,
        loading: false,
      };
    case COMMENTS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
