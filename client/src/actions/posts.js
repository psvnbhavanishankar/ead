import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_POSTS,
  GET_POST_BY_ID,
  GET_POST_BY_ID_2,
  POST_POST,
  UPDATE_POST,
  DELETE_POST,
  POSTS_ERROR,
} from './types';

//Get current user's profile

export const getMyPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts/myposts');

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/posts/');

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getPostById = (Id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${Id}`);

    dispatch({
      type: GET_POST_BY_ID,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getPostById_2 = (Id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${Id}`);

    dispatch({
      type: GET_POST_BY_ID_2,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const postPost = (title, content) => async (dispatch) => {
  try {
    const data = { title: title, content: content };
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/posts/create', data, config);
    // dispatch(setAlert('Profile Updated', 'success'));

    dispatch({
      type: POST_POST,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deletePost = (title) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/${title}`);

    dispatch({ type: DELETE_POST });

    dispatch(setAlert('Your Post has been permanantly deleted'));
  } catch (err) {
    dispatch({
      type: POSTS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
