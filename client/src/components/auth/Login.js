import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import './login.css';
import Navbar2 from '../layout/Navbar2';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  //Redirect if logged in

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <Navbar2 />
      <div className='login_bg'>
        <div className='row'>
          <div className='col-lg-5'>login form</div>
          <div className='col-lg-7'>illustration</div>
        </div>
        <div className='login_form_div'>
          <div>
            <span className='futura'>Login</span>
            <hr className='login_hr' />
          </div>
          <br />
          <div>
            <form onSubmit={e => onSubmit(e)}>
              <input
                className='log_text'
                type='email'
                placeholder='Email Address'
                name='email'
                value={email}
                onChange={e => onChange(e)}
                required
              />
              <input
                className='log_text'
                type='password'
                placeholder='Password'
                name='password'
                minLength='6'
                value={password}
                onChange={e => onChange(e)}
              />
              <br />
              <input className='log_btn' type='submit' value='login' />
              <br />
              <br />
              Don't have an account?
              <br />
              <a classname='log_link' href='/register'>
                Register!
              </a>
            </form>
          </div>
        </div>
        <div className='login_intro'>
          Get back to cooking!
          <br />
        </div>
        <div className='login_img'>
          <img
            className='login_gif'
            src='https://media.giphy.com/media/97ZWlB7ENlalq/giphy.gif'
          />
        </div>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
