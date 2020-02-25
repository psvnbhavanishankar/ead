import React, { Component, Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { lawyer_register } from '../../actions/auth';
import PropTypes from 'prop-types';
import './register.css';
// import Navbar from '../layout/Navbar';

export class Lawyer_Register extends Component {
  state = {
    enrollmentnumber: '',
    lawyername: '',
    lawyerstate: '',
    email: '',
    password: '',
    password2: ''
  };

  static propTypes = {
    setAlert: PropTypes.func.isRequired,
    lawyer_register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmit = async e => {
    e.preventDefault();
    let {
      lawyername,
      email,
      password,
      password2,
      lawyerstate,
      enrollmentnumber
    } = this.state;

    let name = this.props.verify.name;

    let state = this.props.verify.state;
    let enrollmentno = this.props.verify.enrollmentno;

    if (password !== password2) {
      this.props.setAlert('Passwords do not match', 'danger');
    } else {
      this.props.lawyer_register({
        name,
        email,
        password,
        state,
        enrollmentno
      });
    }
  };

  // useEffect(() => {
  //   setFormData({
  //     enrollmentnumber: loading || !enrollmentno ? 'jhgfgh' : enrollmentno,
  //     lawyerstate: loading || !state ? '' : state,
  //     lawyername: loading || !name ? '' : name
  //   });
  // }, [loading]);

  // console.log(enrollmentno);

  // const {
  //   enrollmentnumber,
  //   lawyername,
  //   lawyerstate,
  //   email,
  //   password,
  //   password2
  // } = formData;
  render() {
    if (this.props.auth && this.props.auth.isAuthenticated) {
      return <Redirect to='/dashboard' />;
    }
    const {
      enrollmentnumber,
      lawyername,
      lawyerstate,
      email,
      password,
      password2
    } = this.state;

    return (
      <Fragment>
        {/* <Navbar /> */}
        <div className='register_bg'>
          <div className='hey_there'>
            <img
              className='hey_pic'
              src='https://i.ibb.co/2YY9y4c/hey-01.png'
            />
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
              <form onSubmit={this.onSubmit}>
                <input
                  className='reg_text'
                  type='text'
                  placeholder='Enrollment Number'
                  name='enrollmentnumber'
                  value={this.props.verify.enrollmentno}
                  onChange={this.onChange}
                />
                <input
                  className='reg_text'
                  type='text'
                  placeholder='Name'
                  name='lawyername'
                  value={this.props.verify.name}
                  onChange={this.onChange}
                />
                <input
                  className='reg_text'
                  type='text'
                  placeholder='State'
                  name='lawyerstate'
                  value={this.props.verify.state}
                  onChange={this.onChange}
                />
                <input
                  className='reg_text'
                  type='email'
                  placeholder='Email Address'
                  name='email'
                  value={email}
                  onChange={this.onChange}
                />
                <input
                  className='reg_text'
                  type='password'
                  placeholder='Password'
                  name='password'
                  value={password}
                  onChange={this.onChange}
                />

                <input
                  type='password'
                  className='reg_text'
                  placeholder='Confirm Password'
                  name='password2'
                  value={password2}
                  onChange={this.onChange}
                />
                <br />
                <input className='reg_btn' type='submit' value='Register' />
              </form>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isVerified: state.verify.isVerified,
  auth: state.auth,
  verify: state.verify
});

export default connect(mapStateToProps, { setAlert, lawyer_register })(
  Lawyer_Register
);
