import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import logo from '../../img/logo.png';

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
            Blogs
          </button>
          <div class='dropdown-menu' aria-labelledby='dropdownMenuButton'>
            <a class='dropdown-item'>
              <Link
                to='/allblogs'
                style={{
                  color: 'inherit',
                  textDecoration: 'inherit',
                  fontWeight: 'bold',
                }}
              >
                All Blogs
              </Link>
            </a>
            <a class='dropdown-item'>
              <Link
                to='/myblogs'
                style={{
                  color: 'inherit',
                  textDecoration: 'inherit',
                  fontWeight: 'bold',
                }}
              >
                My Blogs
              </Link>
            </a>
            <a class='dropdown-item'>
              <Link
                to='/bloglist'
                style={{
                  color: 'inherit',
                  textDecoration: 'inherit',
                  fontWeight: 'bold',
                }}
              >
                Upload a Blog
              </Link>
            </a>
          </div>
        </div>
      </li>
      <li>
        <button class='btn '>
          <Link
            to='/lawyerdashboard'
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
            to='/fields'
            className='navtitles'
            style={{
              color: 'inherit',
              textDecoration: 'inherit',
              fontWeight: 'bold',
            }}
          >
            Fields
          </Link>
        </button>
      </li>

      <li>
        <button class='btn '>
          <Link
            to='/lawyerprofile'
            className='navtitles'
            style={{
              color: 'inherit',
              textDecoration: 'inherit',
              fontWeight: 'bold',
            }}
          >
            Lawyer Profile
          </Link>
        </button>
      </li>
      <li>
        <button class='btn '>
          <Link
            to='/searchl'
            className='navtitles'
            style={{
              color: 'inherit',
              textDecoration: 'inherit',
              fontWeight: 'bold',
            }}
          >
            Search
          </Link>
        </button>
      </li>
      <li>
        <button class='btn '>
          <Link
            to='/join2'
            className='navtitles'
            style={{
              color: 'inherit',
              textDecoration: 'inherit',
              fontWeight: 'bold',
            }}
          >
            Chat
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
        {
          <Link to='/'>
            <img src={logo}></img>
          </Link>
        }
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
