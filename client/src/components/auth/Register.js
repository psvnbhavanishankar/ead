import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import './register.css';
// import Navbar from '../layout/Navbar';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <Fragment>
      {/* <Navbar /> */}
      <div className='register_bg'>
        <div className='hey_there'>
          <img className='hey_pic' src='https://i.ibb.co/2YY9y4c/hey-01.png' />
        </div>
        <div className='intro karla'>
          Lorem ipsum dolor sit amet,
          <br />
          consectetuer adipiscing elit, <br />
          sed diam nonummy nibh eu
          <br />
          ismod tincidunt ma.
          <br />
          Already have an account?
          <br />
          <a classname='reg_link' href='/login'>
            Login!
          </a>
        </div>
        <div className='reg_form_div'>
          <div>
            <span className='futura'>Registration</span>
            <hr className='reg_hr' />
          </div>
          <br />
          <div>
            <form onSubmit={e => onSubmit(e)}>
              <input
                className='reg_text'
                type='text'
                placeholder='Name'
                name='name'
                value={name}
                onChange={e => onChange(e)}
              />
              <input
                className='reg_text'
                type='email'
                placeholder='Email Address'
                name='email'
                value={email}
                onChange={e => onChange(e)}
              />
              <input
                className='reg_text'
                type='password'
                placeholder='Password'
                name='password'
                value={password}
                onChange={e => onChange(e)}
              />

              <input
                type='password'
                className='reg_text'
                placeholder='Confirm Password'
                name='password2'
                value={password2}
                onChange={e => onChange(e)}
              />
              <br />
              <input className='reg_btn' type='submit' value='Register' />
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
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
