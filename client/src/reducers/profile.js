import {
  GET_PROFILE,
  GET_LAWYER_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  GET_PROFILES,
  GET_LAWYER_BY_FIELD,
  LAWYER_BY_FIELD_ERROR
} from '../actions/types';

const initialState = {
  profile: null,
  lawyerprofile: null,
  profiles: [],
  loading: true,
  showProfileInfo: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case GET_LAWYER_PROFILE:
      return {
        ...state,
        lawyerprofile: payload,
        loading: false
      };
    case GET_LAWYER_BY_FIELD:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    case PROFILE_ERROR:
    case LAWYER_BY_FIELD_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false
      };
    default:
      return state;
  }
}
