import React, { Fragment, useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { createMessage } from '../../actions/messages';
import './login.css';
import Navbar from '../layout/Navbar';

const Login = ({
  login,
  isAuthenticated,
  type,
  email_sent,
  createMessage,
  loading,
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (email_sent) {
      createMessage({
        email_sent:
          'A verification email has already been sent. Please verify.',
      });
    }
  }, [loading]);

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  //Redirect if logged in

  if (isAuthenticated && type == 'client') {
    return <Redirect to='/dashboard' />;
  } else if (isAuthenticated && type == 'lawyer') {
    return <Redirect to='/lawyerdashboard' />;
  }
  console.log(email_sent);

  return (
    <Fragment>
      <Navbar />
      <div className='login_bg'>
        <div className='login_form_div1'>
          <div>
            <span className='futura'>
              Log<span className='futuraa'>in</span>
            </span>
            <hr className='login_hr' />
          </div>
          <br />
          <div>
            <form onSubmit={(e) => onSubmit(e)}>
              <input
                className='log_text'
                type='email'
                placeholder='Email Address'
                name='email'
                value={email}
                onChange={(e) => onChange(e)}
                required
              />
              <input
                className='log_text'
                type='password'
                placeholder='Password'
                name='password'
                minLength='6'
                value={password}
                onChange={(e) => onChange(e)}
              />
              <br />
              <input className='log_btn' type='submit' value='LOGIN' />
              <br />
              Don't have an account?
              <br />
              <a id='log_link' href='/register'>
                REGISTER
              </a>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  email_sent: PropTypes.bool,
  createMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  email_sent: state.auth.email_sent,
  type: state.auth.type,
});

export default connect(mapStateToProps, { login, createMessage })(Login);
