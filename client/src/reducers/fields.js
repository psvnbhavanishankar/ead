import { GET_FIELDS, FIELDS_ERROR, POST_FIELDS } from '../actions/types';

const initialState = {
  post_fields: null,
  fields: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_FIELDS:
      return {
        ...state,
        loading: false,
        fields: payload
      };
    case POST_FIELDS:
      return {
        ...state,
        loading: false,
        fields: payload,
        post_fields: true
      };
    case FIELDS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
