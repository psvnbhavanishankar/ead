import {
  GET_PROFILE,
  GET_EDIT_PROFILE,
  GET_LAWYER_PROFILE,
  GET_LAWYER_PROFILES_TO_COMPARE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  GET_PROFILES,
  GET_LAWYER_BY_FIELD,
  GET_LAWYER_BY_ID,
  LAWYER_BY_FIELD_ERROR,
  GET_LAWYER_PROFILES,
  LAWYER_BY_ID_ERROR,
  ENDORSE,
  ENDORSE_ERROR,
  GET_EDIT_LAWYER_PROFILE,
} from '../actions/types';

const initialState = {
  profile: null,
  lawyerprofiles_to_compare: [],
  lawyerprofile: null,
  lawyerprofilebyID: null,
  profiles: [],
  lawyerprofiles: [],
  loading: true,
  showProfileInfo: true,
  error: {},
  getlawyersuccess: null,
  count: 0,
  selected_profiles: [],
  selected_lprofiles: [],
  endorse_response: {},
  endorse_success: null,
  edit: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_EDIT_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
        edit: true,
      };
    case GET_LAWYER_PROFILE:
      return {
        ...state,
        lawyerprofile: payload,
        getlawyersuccess: true,
        loading: false,
      };
    case GET_EDIT_LAWYER_PROFILE:
      return {
        ...state,
        lawyerprofile: payload,
        getlawyersuccess: true,
        loading: false,
        edit: true,
      };
    case GET_LAWYER_PROFILES_TO_COMPARE:
      return {
        ...state,
        lawyerprofiles_to_compare: payload,
        getlawyersuccess: true,
        loading: false,
      };
    case ENDORSE:
      return {
        ...state,
        endorse_response: payload,
        endorse_success: true,
        loading: false,
      };
    case GET_LAWYER_BY_ID:
      return {
        ...state,
        lawyerprofilebyID: payload,
        loading: false,
        getlawyersuccess: true,
      };
    case GET_LAWYER_BY_FIELD:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case GET_LAWYER_PROFILES:
      return {
        ...state,
        lawyerprofiles: payload,
        getlawyersuccess: true,
        loading: false,
      };
    case PROFILE_ERROR:
    case LAWYER_BY_FIELD_ERROR:
    case LAWYER_BY_ID_ERROR:
    case ENDORSE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
      };
    default:
      return state;
  }
}
