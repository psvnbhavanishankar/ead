import { VERIFY_FAIL, VERIFY_SUCCESS } from '../actions/types';

const initialState = {
  isVerified: null,
  loading: true,
  enrollmentno: '',
  name: '',
  state: ''
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case VERIFY_SUCCESS:
      return {
        ...state,
        ...payload,
        isVerified: true,
        loading: false
      };

    case VERIFY_FAIL:
      return {
        ...state,
        isVerified: false,
        loading: false
      };

    default:
      return state;
  }
}
