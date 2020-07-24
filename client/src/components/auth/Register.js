import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import { createMessage } from '../../actions/messages';
import PropTypes from 'prop-types';
import './register.css';
import Navbar from '../layout/Navbar';

const Register = ({
  setAlert,
  register,
  isAuthenticated,
  email_sent,
  createMessage,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      createMessage({ passwordsNotMatch: 'Passwords do not match' });
    } else {
      createMessage({
        wait: 'You will be redirected. Please wait.',
      });
      register({ name, email, password });
    }
  };

  if (email_sent) {
    return <Redirect to='/login' />;
  }
  return (
    <Fragment>
      <Navbar />
      <div className='register_bg'>
        <div className='reg_form_div'>
          <div>
            <span className='futura'>
              <span className='futuraa'>Reg</span>istration
            </span>
            <hr className='reg_hr' />
          </div>
          <div>
            <form onSubmit={(e) => onSubmit(e)}>
              <input
                className='reg_text'
                type='text'
                placeholder='Name'
                name='name'
                value={name}
                onChange={(e) => onChange(e)}
              />
              <input
                className='reg_text'
                type='email'
                placeholder='Email Address'
                name='email'
                value={email}
                onChange={(e) => onChange(e)}
              />
              <input
                className='reg_text'
                type='password'
                placeholder='Password'
                name='password'
                value={password}
                onChange={(e) => onChange(e)}
              />
              <input
                type='password'
                className='reg_text'
                placeholder='Confirm Password'
                name='password2'
                value={password2}
                onChange={(e) => onChange(e)}
              />
              <br />
              <br />
              <input className='reg_btn' type='submit' value='REGISTER' />{' '}
              <br />
              <br />
              <br />
              <a id='reg_link' href='/login'>
                LOGIN
              </a>
              <br />
              <br />
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  email_sent: PropTypes.bool,
  createMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  email_sent: state.auth.email_sent,
});

export default connect(mapStateToProps, { setAlert, register, createMessage })(
  Register
);
