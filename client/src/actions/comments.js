import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_COMMENTS_2,
  GET_COMMENTS,
  POST_COMMENT,
  UPDATE_COMMENT,
  DELETE_COMMENT,
  COMMENTS_ERROR,
} from './types';

//Get current user's profile

export const getComments = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/comments/${id}`);

    dispatch({
      type: GET_COMMENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COMMENTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getComments_2 = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/comments/${id}`);

    dispatch({
      type: GET_COMMENTS_2,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COMMENTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const postComment = (post, comment) => async (dispatch) => {
  try {
    var data = {
      post: post,
      content: comment,
    };
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/comments/create', data, config);

    dispatch({
      type: POST_COMMENT,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: COMMENTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deletePost = (data) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.delete('/api/comments/', data, config);

    dispatch({ type: DELETE_COMMENT });

    dispatch(setAlert('Your Post has been permanantly deleted'));
  } catch (err) {
    dispatch({
      type: COMMENTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
