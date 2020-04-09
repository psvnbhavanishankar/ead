import {
  GET_MY_CASES,
  GET_CASE_BY_ID,
  GET_CLIENT_CASES,
  GET_LAWYER_CASES,
  POST_CASE,
  CASES_ERROR,
} from '../actions/types';

const initialState = {
  case: null,
  lawyercases: [],
  clientcases: [],
  mycases: [],
  loading: true,
  error: {},
  postcasesuccess: null,
  getlsuccess: null,
  getcsucceess: null,
  getcase: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_MY_CASES:
      return {
        ...state,
        mycases: payload,
        loading: false,
      };
    case GET_LAWYER_CASES:
      return {
        ...state,
        lawyercases: payload,
        getlsuccess: true,
        loading: false,
      };
    case GET_CLIENT_CASES:
      return {
        ...state,
        clientcases: payload,
        getcsucceess: true,
        loading: false,
      };
    case GET_CASE_BY_ID:
      return {
        ...state,
        case: payload,
        getcase: true,
        loading: false,
      };
    case POST_CASE:
      return {
        ...state,
        case: payload,
        postcasesuccess: true,
        loading: false,
      };
    case CASES_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
