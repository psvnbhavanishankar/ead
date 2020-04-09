import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <div className='dropdown'>
          <button
            class='btn dropdown-toggle'
            type='button'
            id='dropdownMenuButton'
            data-toggle='dropdown'
          >
            Discussion Forum
          </button>
          <div class='dropdown-menu' aria-labelledby='dropdownMenuButton'>
            <a class='dropdown-item'>
              <Link
                to='/posts'
                style={{
                  color: 'inherit',
                  textDecoration: 'inherit',
                  fontWeight: 'bold',
                }}
              >
                Posts
              </Link>
            </a>
            <a class='dropdown-item'>
              <Link
                to='/upload_post'
                style={{
                  color: 'inherit',
                  textDecoration: 'inherit',
                  fontWeight: 'bold',
                }}
              >
                Upload a Post
              </Link>
            </a>
          </div>
        </div>
      </li>
      <li>
        <button class='btn '>
          <Link
            to='/dashboard'
            className='navtitles'
            style={{
              color: 'inherit',
              textDecoration: 'inherit',
              fontWeight: 'bold',
            }}
          >
            Dashboard
          </Link>
        </button>
      </li>

      <li>
        <button class='btn '>
          <Link
            to='/clientprofile'
            className='navtitles'
            style={{
              color: 'inherit',
              textDecoration: 'inherit',
              fontWeight: 'bold',
            }}
          >
            Client Profile
          </Link>
        </button>
      </li>
      <li>
        <button class='btn '>
          <a
            onClick={logout}
            href='/login'
            style={{
              color: 'inherit',
              textDecoration: 'inherit',
              fontWeight: 'bold',
            }}
          >
            <i className='fas fa-sign-out-alt'></i>{' '}
            <span className='hide-sm'>Logout</span>
          </a>
        </button>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      {/* <li>
        <a href='#!'>Developers</a>
      </li> */}
      <li>
        <Link to='/register' className='navtitles'>
          REGISTER
        </Link>
      </li>
      <li>
        <Link to='/verify' className='navtitles'>
          LAWYER-REG
        </Link>
      </li>
      <li>
        <Link to='/login' className='navtitles'>
          LOGIN
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar'>
      <h1>
        <Link to='/'>
          <i class='fa fa-balance-scale' aria-hidden='true'></i>{' '}
          <span className='title1'>DeJure</span>
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
