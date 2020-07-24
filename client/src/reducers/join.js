import { GET_JOIN, POST_JOIN, JOIN_ERROR } from '../actions/types';

const initialState = {
  post_join: false,
  get_array: [],
  loading2: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_JOIN:
      return {
        ...state,
        get_array: payload,
        loading2: false,
      };
    case POST_JOIN:
      return {
        ...state,
        post_join: true,
        loading2: false,
      };
    case JOIN_ERROR:
      return {
        ...state,
        error: payload,
        loading2: false,
      };

    default:
      return state;
  }
}
