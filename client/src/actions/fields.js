import axios from 'axios';
import { setAlert } from './alert';

import { GET_FIELDS, FIELDS_ERROR, POST_FIELDS } from './types';
import { selectFields } from 'express-validator/src/select-fields';

//Get current user's profile

export const getFields = () => async dispatch => {
  try {
    const res = await axios.get('/api/fields/');

    dispatch({
      type: GET_FIELDS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: FIELDS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const postFields = selected_fields => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const field = { fields: selected_fields.selected };
    console.log(field);

    const res = await axios.post('/api/profile/fields', field, config);

    dispatch({
      type: POST_FIELDS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: FIELDS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
