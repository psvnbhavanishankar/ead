import { combineReducers } from 'redux';
import alert from './alert';
import verify from './verify';
import auth from './auth';
import profile from './profile';
import messages from './messages';
import errors from './errors';
import fields from './fields';
import cases from './cases';
import Blog from './Blog';
import allblogs from './allblogs';
import posts from './posts';
import comments from './comments';

export default combineReducers({
  alert,
  auth,
  profile,
  verify,
  messages,
  errors,
  fields,
  cases,
  Blog,
  allblogs,
  posts,
  comments,
});
