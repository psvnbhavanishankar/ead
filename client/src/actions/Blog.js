import axios from 'axios';
import { GET_BLOG, DELETE_BLOG, ADD_BLOG, BLOG_ERROR } from './types';
import { returnErrors } from './messages';
import { tokenConfig } from './auth';

// GET BLOG LIST
export const getBlog = () => (dispatch, getState) => {
  axios
    .get('api/blogs/myblogs')
    .then((res) => {
      dispatch({
        type: GET_BLOG,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: BLOG_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      })
    );
};

// DELETE BLOG

export const deleteBlog = (title) => async (dispatch) => {
  axios
    .delete(`api/blogs/${title}`)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: DELETE_BLOG,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// DELETE BLOG

export const addBlog = (title, content, id) => (dispatch, getState) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const addblog = {
    title: title,
    content: content,
  };

  axios
    .post('api/blogs/create', addblog, config, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADD_BLOG,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
