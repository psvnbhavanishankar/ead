import { combineReducers } from 'redux';
import alert from './alert';
import verify from './verify';
import auth from './auth';
import profile from './profile';
import messages from './messages';
import errors from './errors';
import fields from './fields';

export default combineReducers({
  alert,
  auth,
  profile,
  verify,
  messages,
  errors,
  fields
});
