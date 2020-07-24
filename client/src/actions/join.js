import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_JOIN,
  POST_JOIN,
  JOIN_ERROR,
  GET_LAWYER_PROFILE,
  PROFILE_ERROR,
} from './types';

//Get current user's profile

export const getJoinInfo = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/chat/');
    const res_2 = await axios.get('/api/profile/lawyer/me');

    dispatch({
      type: GET_JOIN,
      payload: res.data,
    });
    dispatch({
      type: GET_LAWYER_PROFILE,
      payload: res_2.data,
    });
  } catch (err) {
    dispatch({
      type: JOIN_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const Join_Client = (data) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/chat/', data, config);

    dispatch({
      type: POST_JOIN,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: JOIN_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
