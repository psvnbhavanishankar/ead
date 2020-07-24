import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_CASE_BY_ID,
  GET_CLIENT_CASES,
  GET_LAWYER_CASES,
  GET_MY_CASES,
  CASES_ERROR,
  POST_CASE,
} from './types';

//Get current user's profile

export const getMyCases = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/cases/mycases');

    dispatch({
      type: GET_MY_CASES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CASES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getMyCasesasClient = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/cases/mycasesasclient');

    dispatch({
      type: GET_MY_CASES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CASES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getClientCases = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/cases/clientcases/${id}`);

    dispatch({
      type: GET_CLIENT_CASES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CASES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getLawyerCases = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/cases/lawyercases/${id}`);

    dispatch({
      type: GET_LAWYER_CASES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CASES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getCaseById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/cases/${userId}`);

    dispatch({
      type: GET_CASE_BY_ID,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CASES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const postCase = (formData) => async (dispatch) => {
  try {
    console.log(formData);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/cases/', formData, config);
    // dispatch(setAlert('Profile Updated', 'success'));

    dispatch({
      type: POST_CASE,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: CASES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
