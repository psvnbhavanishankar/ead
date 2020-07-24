import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { editProfile, getCurrentProfile } from '../../actions/profile';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PhoneNumber from 'react-phone-number';
import Navbar from '../layout/Navbar';
import Spinner from '../layout/Spinner';
import './editprofile.css';
import user from './user.png';

const ViewProfile = ({ profile: { lawyerprofilebyID, loading } }) => {
  //   const [formData, setFormData] = useState({
  //     locality: '',
  //     city: '',
  //     pincode: '',
  //     // skills: "",
  //     // dob: "",
  //     // mobile: "",
  //     name: '',
  //     email: '',
  //     avatar: '',
  //     // following: "",
  //     // followers: ""
  //   });

  //   useEffect(() => {
  //     getCurrentProfile();

  //     setFormData({
  //       locality:
  //         loading || !(profile.address && profile.address.locality)
  //           ? ''
  //           : profile.address.locality,
  //       city:
  //         loading || !(profile.address && profile.address.city)
  //           ? ''
  //           : profile.address.city,
  //       pincode:
  //         loading || !(profile.address && profile.address.pincode)
  //           ? ''
  //           : profile.address.pincode,
  //       // dob: loading || !profile.dob ? "" : profile.dob,
  //       // mobile: loading || !profile.mobile ? "" : profile.mobile,
  //       name: loading || !profile.user.name ? '' : profile.user.name,
  //       email: loading || !profile.user.email ? '' : profile.user.email,
  //       avatar: loading || !profile.user.avatar ? '' : profile.user.avatar,
  //     });
  //   }, [loading]);

  //   const {
  //     locality,
  //     city,
  //     pincode,
  //     // skills,
  //     // dob,
  //     // mobile,
  //     name,
  //     email,
  //     avatar,
  //   } = formData;

  return !loading ? (
    <Fragment>
      <Navbar />

      <div className='login_bg3'>
        <div className='login_form_div3'>
          <div className='editprotop'>
            <div className='myrectop_cont'>
              <span className='futura'>
                <span className='futuraa'>Profile</span>
              </span>
            </div>
            <hr className='myrechr1' />
          </div>
          {lawyerprofilebyID ? (
            <img
              className='myimg'
              src={lawyerprofilebyID.image}
              onError={{ src: { user } }}
            ></img>
          ) : (
            ''
          )}
          <br />
          <br />
          <div className='container-fluid'>
            <div className='row editprobot'>
              <div className='col-lg'>
                <form>
                  <div className='row editprorows'>
                    <div className='col-lg-3 editprotext2'>Username: </div>
                    <div className='col-lg-9'>
                      {lawyerprofilebyID.user && lawyerprofilebyID.user.name ? (
                        <input
                          className='editproinput2'
                          type='text'
                          placeholder='UserName'
                          name='name'
                          value={lawyerprofilebyID.user.name}
                        />
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                  <div className='row editprorows'>
                    <div className='col-lg-3 editprotext2'>Email: </div>
                    <div className='col-lg-9'>
                      {lawyerprofilebyID.user &&
                      lawyerprofilebyID.user.email ? (
                        <input
                          className='editproinput2'
                          type='text'
                          placeholder='email'
                          name='email'
                          value={lawyerprofilebyID.user.email}
                        />
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                  <div className='row editprorows'>
                    <div className='col-lg-3 editprotext2'>
                      Enrollment Number:{' '}
                    </div>
                    <div className='col-lg-9'>
                      {lawyerprofilebyID.user &&
                      lawyerprofilebyID.user.enrollmentno ? (
                        <input
                          className='editproinput2'
                          type='text'
                          placeholder='enrollmentno'
                          name='enrollmentno'
                          value={lawyerprofilebyID.user.enrollmentno}
                        />
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                  <div className='row editprorows'>
                    <div className='col-lg-3 editprotext2'>State: </div>
                    <div className='col-lg-9'>
                      {lawyerprofilebyID.user &&
                      lawyerprofilebyID.user.state ? (
                        <input
                          className='editproinput2'
                          type='text'
                          placeholder='state'
                          name='state'
                          value={lawyerprofilebyID.user.state}
                        />
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                  {/* <div className="row editprorows">
                <div className="col-lg-3 editprotext">Date of birth:</div>
                <div className="col-lg-9">
                  <input
                    className="editproinput"
                    type="date"
                    placeholder="Date Of Birth"
                    name="dob"
                    value={dob}
                    onChange={e => onChange(e)}
                  />
                </div>
              </div>
              <div className="row editprorows">
                <div className="col-lg-3 editprotext">Mobile:</div>
                <div className="col-lg-9">
                  {" "}
                  <input
                    className="editproinput"
                    type="text"
                    placeholder="Mobile Number"
                    name="mobile"
                    value={mobile}
                    onChange={e => onChange(e)}
                  />
                </div>
              </div> */}
                  {/* <div className='row editprorows'>
                      <div className='col-lg-3 editprotext2'>Image: </div>
                      <div className='col-lg-9'>
                        <input
                          className='editproinput2'
                          type='image'
                          placeholder='image'
                          name='image'
                          value={lawyerprofilebyID.user.avatar}
                        />
                      </div>
                    </div> */}
                  <div className='row editprorows'>
                    <div className='col-lg-3 editprotext2'>Address: </div>
                    <div className='col-lg-9'>
                      <div>
                        {lawyerprofilebyID.address &&
                        lawyerprofilebyID.address.locality ? (
                          <input
                            className='editproinput2'
                            type='text'
                            placeholder='Locality'
                            name='locality'
                            value={lawyerprofilebyID.address.locality}
                          />
                        ) : (
                          ''
                        )}
                      </div>
                      <div>
                        {lawyerprofilebyID.address &&
                        lawyerprofilebyID.address.city ? (
                          <input
                            className='editproinput2'
                            type='text'
                            placeholder='City'
                            name='city'
                            value={lawyerprofilebyID.address.city}
                          />
                        ) : (
                          ''
                        )}
                      </div>

                      <div>
                        {lawyerprofilebyID.address &&
                        lawyerprofilebyID.address.pincode ? (
                          <input
                            className='editproinput2'
                            type='text'
                            placeholder='Pincode'
                            name='pincode'
                            value={lawyerprofilebyID.address.pincode}
                          />
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='row editprorows'>
                    <div className='col-lg-3 editprotext2'>Licensed Year: </div>
                    <div className='col-lg-9'>
                      {lawyerprofilebyID.licensed_year ? (
                        <input
                          className='editproinput2'
                          type='text'
                          placeholder='Licensed Year'
                          name='licensed_year'
                          value={lawyerprofilebyID.licensed_year}
                        />
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                  <div className='row editprorows'>
                    <div className='col-lg-3 editprotext2'>Mobile: </div>
                    <div className='col-lg-9'>
                      {lawyerprofilebyID.mobile ? (
                        <PhoneNumber
                          className='phone'
                          number={lawyerprofilebyID.mobile}
                          isLinked={true}
                        />
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                  <div className='row editprorows'>
                    <div className='col-lg-3 editprotext2'>
                      Areas of Experience:{' '}
                    </div>
                    <div className='col-lg-9'>
                      {lawyerprofilebyID.practice_areas ? (
                        <input
                          className='editproinput2'
                          type='text'
                          placeholder='Licensed Year'
                          name='licensed_year'
                          value={lawyerprofilebyID.practice_areas.join(', ')}
                        />
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                  <div className='row editprorows'>
                    <div className='col-lg-3 editprotext2'>Advance Price: </div>
                    <div className='col-lg-9'>
                      {lawyerprofilebyID.price ? (
                        <input
                          className='editproinput2'
                          type='text'
                          placeholder='Price'
                          name='price'
                          value={lawyerprofilebyID.price}
                        />
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                  <div className='row editprorows'>
                    <div className='col-lg-3 editprotext2'>Experience: </div>
                    <div className='col-lg-9'>
                      {lawyerprofilebyID.experience ? (
                        <textarea
                          rows={20}
                          name='experience'
                          className='editproinput2'
                          value={lawyerprofilebyID.experience}
                        />
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                  <br />
                  <div>
                    <br />
                    <br />
                    <Link push to='/join'>
                      <button className='log_btn'>
                        Chat with{' '}
                        {lawyerprofilebyID.user && lawyerprofilebyID.user.name
                          ? lawyerprofilebyID.user.name
                          : ''}
                      </button>
                    </Link>
                    <br />
                    <br />
                  </div>
                  <div>
                    <br />
                    <br />
                    <Link push to='/pay'>
                      <button className='log_btn'>
                        Hire for{' '}
                        {lawyerprofilebyID.price ? lawyerprofilebyID.price : 0}
                      </button>
                    </Link>
                    <br />
                    <br />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  ) : (
    <Spinner />
  );
};

ViewProfile.propTypes = {
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, null)(ViewProfile);
