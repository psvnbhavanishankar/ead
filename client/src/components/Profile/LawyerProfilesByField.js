import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { getLawyerbyID } from '../../actions/profile';
import Navbar from '../layout/Navbar';
import Spinner from '../layout/Spinner';
import './editprofile.css';
import './lawyerdisplay.css';
import user from './user.png';
const LawyerProfilesByField = ({
  profile: { profile, loading, profiles, getlawyersuccess },
  getLawyerbyID,
}) => {
  if (getlawyersuccess) {
    return <Redirect push to='/view_profile' />;
  }

  const onclick = (e, data) => {
    e.preventDefault();
    getLawyerbyID(data);
  };

  return !loading ? (
    <Fragment>
      {
        <Fragment>
          <Navbar />
          <br />

          <div className='ak1'>
            <div className='container'>
              <div>
                <span class='cuisineheadfutura'>
                  <span class='futuraa'>Lawyers</span>
                </span>
                <br />
                <br />
                <br />
                <br />
              </div>
              <form>
                <div class='row'>
                  {profiles ? (
                    profiles.map((field) => (
                      <div
                        className='col-lg-4'
                        style={{ paddingBottom: '70px' }}
                      >
                        <div id='lawyercard'>
                          <div style={{ overflow: 'hidden' }}>
                            <br />
                            <br />
                            <img style={{ width: '50%' }} src={user} />

                            <label style={{ width: '93%' }}>
                              <div
                                className='row'
                                style={{ paddingTop: '10px' }}
                              >
                                <div className='col-lg-12'>
                                  <div class='cuisinekarla'>
                                    <Link
                                      onClick={(e) => onclick(e, field._id)}
                                      style={{
                                        color: '#664d34',
                                        textAlign: 'left',
                                        fontSize: '20px',
                                        fontFamily: 'Rokkitt',
                                      }}
                                    >
                                      {field.user.name}
                                    </Link>
                                    <br />
                                  </div>
                                </div>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <h4>No Lawyers</h4>
                  )}
                </div>
              </form>
            </div>
          </div>
        </Fragment>
      }
    </Fragment>
  ) : (
    <Spinner />
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

export default connect(mapStateToProps, { getLawyerbyID })(
  LawyerProfilesByField
);
