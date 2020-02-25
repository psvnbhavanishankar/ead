import { combineReducers } from 'redux';
import alert from './alert';
import verify from './verify';
import auth from './auth';
import profile from './profile';

export default combineReducers({
  alert,
  auth,
  profile,
  verify
});
