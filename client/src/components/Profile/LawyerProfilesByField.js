import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { getLawyerProfileById } from '../../actions/profile';
import Navbar from '../layout/Navbar';
import './editprofile.css';
const LawyerProfilesByField = ({
  profile: { profile, loading, profiles, getlawyersuccess },
  getLawyerProfileById,
}) => {
  const onSubmit = (e, data) => {
    e.preventDefault();
    getLawyerProfileById(data);
  };

  if (getlawyersuccess) {
    return <Redirect push to='/pay' />;
  }

  return (
    <Fragment>
      <Navbar />
      <br />
      <br />
      <br />

      <div></div>
      {
        <Fragment>
          <div className='cab'>
            <br />
            <center>
              <span className='futura'>
                <span className='futuraa'>Law</span>yers
              </span>
            </center>
            {profiles ? (
              profiles.map((profile) => (
                <div>
                  <div className='card6'>
                    <div>
                      {profile.user && profile.user.name ? (
                        <div>
                          <p class='cuisinekarla'>
                            <span className='jas2'>NAME: </span>{' '}
                            {profile.user.name}
                          </p>
                        </div>
                      ) : (
                        ''
                      )}
                      {profile.user && profile.user.email ? (
                        <p class='cuisinekarla'>
                          <span className='jas2'>EMAIL: </span>
                          {profile.user.email}
                        </p>
                      ) : (
                        ''
                      )}

                      {profile.practice_areas
                        ? profile.practice_areas.map((area) => (
                            <p className='cuisinekarla'>
                              <span className='jas2'>FIELDS:</span>
                              {area}{' '}
                            </p>
                          ))
                        : ''}

                      <p className='cuisinekarla'>
                        <span className='jas2'>PRICE:</span>
                        {profile.price ? profile.price : ''}

                        {profile.user && profile.user._id ? (
                          <div className='pd'>
                            <form>
                              <button
                                className='log_btn'
                                onClick={(e) => onSubmit(e, profile.user._id)}
                              >
                                Hire for {profile.price ? profile.price : 0}
                              </button>
                            </form>
                          </div>
                        ) : (
                          ''
                        )}
                      </p>
                    </div>
                  </div>
                  <br />
                  <br />
                </div>
              ))
            ) : (
              <p> No profiles</p>
            )}
          </div>
        </Fragment>
      }
    </Fragment>
  );
};

LawyerProfilesByField.propTypes = {
  profile: PropTypes.object.isRequired,
  getlawyersuccess: PropTypes.bool,
  getLawyerProfileById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getLawyerProfileById })(
  LawyerProfilesByField
);
