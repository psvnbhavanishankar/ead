import { GET_ALLBLOGS } from '../actions/types';

const initialState = {
  allblogs: [],
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALLBLOGS:
      return {
        ...state,
        allblogs: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
