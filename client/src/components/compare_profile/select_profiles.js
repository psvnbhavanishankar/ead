import React, { useEffect, useState, Fragment } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getLawyerProfiles,
  get_profiles_to_compare,
} from '../../actions/profile';
import { setAlert } from '../../actions/alert';
import { createMessage } from '../../actions/messages';

import user from '../Profile/user.png';

import Navbar from '../layout/Navbar';
import Spinner from '../layout/Spinner';

// import Navbar from './Navbar';

const Select_Profiles = ({
  getLawyerProfiles,
  get_profiles_to_compare,
  history,
  createMessage,
  auth,
  profile: {
    lawyerprofiles,
    lawyerprofiles_to_compare,
    selected_profiles,
    selected_lprofiles,
  },
  onSubmit,
}) => {
  useEffect(() => {
    getLawyerProfiles();
  }, []);

  onSubmit = (e) => {
    e.preventDefault();
    if (selected_profiles.length !== 2) {
      createMessage({
        profilesSelected_nottwo: 'Please select exactly two profiles',
      });
    }
    if (selected_profiles.length === 2) {
      get_profiles_to_compare(selected_lprofiles);
    }
  };

  const onChange = function (id) {
    if (lawyerprofiles) {
      if (document.getElementById(id).checked === true) {
        for (var i = 0; i < lawyerprofiles.length; i++) {
          if (lawyerprofiles[i].user.name === id) {
            if (!selected_profiles.includes(lawyerprofiles[i].user.name)) {
              selected_lprofiles.push(lawyerprofiles[i]._id);
              selected_profiles.push(lawyerprofiles[i].user.name);
            }
          }
        }
      } else if (document.getElementById(id).checked === false) {
        for (i = 0; i < lawyerprofiles.length; i++) {
          if (lawyerprofiles[i].user.name === id) {
            if (selected_profiles.includes(lawyerprofiles[i].user.name)) {
              const index = selected_profiles.indexOf(
                lawyerprofiles[i].user.name
              );

              selected_lprofiles.splice(index);
              selected_profiles.splice(index);
            }
          }
        }
      }
    }
  };

  if (lawyerprofiles_to_compare.length == 2) {
    return <Redirect push to='/compare_profiles' />;
  }
  return lawyerprofiles ? (
    <Fragment>
      {
        <Fragment>
          <Navbar />
          <br />
          <br />
          <br />
          {/* <div className='cuisine_bgg'> */}
          <div className='back10'>
            <div className='container'>
              <div className='container3'>
                <div>
                  <center>
                    <span class='cuisineheadfutura' style={{ color: 'white' }}>
                      Select
                      <span class='futuraa'> Lawyers </span>to Compare
                    </span>
                  </center>
                  <br />
                  <br />
                  <br />
                  <br />
                </div>
                <form onSubmit={onSubmit}>
                  <div class='row'>
                    {lawyerprofiles.map((field) => (
                      <div
                        className='col-lg-4'
                        style={{ paddingBottom: '70px' }}
                      >
                        <div class='cuisinerow2col1cont'>
                          <div
                            id='lawyercard'
                            id='MyElement'
                            style={{ overflow: 'hidden' }}
                          >
                            <center>
                              <img style={{ width: '50%' }} src={user} />
                            </center>
                            <label style={{ width: '93%' }}>
                              <div
                                className='row'
                                style={{ paddingTop: '10px' }}
                              >
                                <div className='col-lg-10'>
                                  <div
                                    style={{
                                      color: '#664d34',
                                      textAlign: 'center',
                                      fontSize: '20px',
                                      fontFamily: 'Rokkitt',
                                    }}
                                  >
                                    {field.user.name}
                                  </div>
                                </div>
                                <div className='col-lg-2'>
                                  <input
                                    id={field.user.name}
                                    name={field.user.name}
                                    type='checkbox'
                                    class='cuisineinput'
                                    value={field.user.name}
                                    onChange={onChange.bind(
                                      this,
                                      field.user.name
                                    )}
                                  ></input>
                                </div>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}

                    <button
                      className='cuisinesavebtn'
                      style={{ position: 'absolute', top: '35%', left: '45%' }}
                      type='submit'
                    >
                      COMPARE
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* </div> */}
        </Fragment>
      }
    </Fragment>
  ) : (
    <Spinner />
  );
};

Select_Profiles.propTypes = {
  getLawyerProfiles: PropTypes.func.isRequired,
  createMessage: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  get_profiles_to_compare: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default withRouter(
  connect(mapStateToProps, {
    getLawyerProfiles,
    get_profiles_to_compare,

    createMessage,
  })(Select_Profiles)
);
