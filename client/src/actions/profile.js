import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_PROFILE,
  GET_EDIT_PROFILE,
  GET_LAWYER_PROFILE,
  GET_EDIT_LAWYER_PROFILE,
  GET_LAWYER_PROFILES_TO_COMPARE,
  GET_LAWYER_BY_FIELD,
  GET_LAWYER_BY_ID,
  LAWYER_BY_ID_ERROR,
  LAWYER_BY_FIELD_ERROR,
  PROFILE_ERROR,
  ACCOUNT_DELETED,
  CLEAR_PROFILE,
  GET_PROFILES,
  GET_LAWYER_PROFILES,
  ENDORSE,
  ENDORSE_ERROR,
} from './types';

//Get current user's profile

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getLawyerProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/lawyer/me');

    dispatch({
      type: GET_LAWYER_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getLawyerbyField = (data) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    var formdata = { field: data };

    const res = await axios.post('/api/profile/field', formdata, config);

    dispatch({
      type: GET_LAWYER_BY_FIELD,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LAWYER_BY_FIELD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getLawyerbyID = (data) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile_lawyer/${data}`);

    dispatch({
      type: GET_LAWYER_BY_ID,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LAWYER_BY_ID_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get all profiles

export const getProfiles = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile');
    const lawyers = await axios.get('/api/profile/lawyers');

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
    dispatch({
      type: GET_LAWYER_PROFILES,
      payload: lawyers.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getLawyerProfiles = () => async (dispatch) => {
  try {
    const lawyers = await axios.get('/api/profile/lawyers');

    dispatch({
      type: GET_LAWYER_PROFILES,
      payload: lawyers.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getLawyerProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/lawyer/${userId}`);

    dispatch({
      type: GET_LAWYER_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const get_profiles_to_compare = (userId) => async (dispatch) => {
  try {
    const formdata = {
      array: userId,
    };
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post(
      '/api/profile/lawyer/compare',
      formdata,
      config
    );

    dispatch({
      type: GET_LAWYER_PROFILES_TO_COMPARE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const endorse = (name) => async (dispatch) => {
  try {
    const formdata = {
      name: name,
    };
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post('/api/profile/endorse', formdata, config);

    dispatch({
      type: ENDORSE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ENDORSE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Edit Profile

export const editProfile = (formData, edit = true) => async (dispatch) => {
  try {
    console.log(formData);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/profile/update', formData, config);
    dispatch(setAlert('Profile Updated', 'success'));

    dispatch({
      type: GET_EDIT_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const editLawyerProfile = (formData, edit = true) => async (
  dispatch
) => {
  try {
    console.log(formData);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/profile/lawyerupdate', formData, config);
    dispatch(setAlert('Profile Updated', 'success'));

    dispatch({
      type: GET_EDIT_LAWYER_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// export const editFollow = (data, edit = true) => async dispatch => {
//   try {
//     const config = {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     };

//     const res = await axios.post('/api/profile/follow', data, config);
//     // dispatch(setAlert('Following', 'success'));

//     dispatch({
//       type: GET_PROFILE,
//       payload: res.data
//     });
//   } catch (err) {
//     const errors = err.response.data.errors;

//     if (errors) {
//       errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
//     }
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };

//Delete account and profile

export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      const res = await axios.delete('/api/profile');

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert('Your account has been permanantly deleted'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
