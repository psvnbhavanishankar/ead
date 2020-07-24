import {
  GET_BLOG,
  DELETE_BLOG,
  ADD_BLOG,
  BLOG_ERROR,
} from '../actions/types.js';

const initialState = {
  Blog: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_BLOG:
      return {
        ...state,
        Blog: action.payload,
        loading: false,
      };

    case DELETE_BLOG:
      return {
        ...state,
        Blog: state.Blog.filter((Blog) => Blog.title !== action.payload),
        loading: false,
      };

    case ADD_BLOG:
      return {
        ...state,
        Blog: [...state.Blog, action.payload],
        loading: false,
      };
    case BLOG_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
