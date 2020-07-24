import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { editProfile, getCurrentProfile } from '../../actions/profile';
import { Link, withRouter } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import './editprofile1.css';
import user from '../Profile/user.png';

const Compare = ({ profile: { loading, lawyerprofiles_to_compare } }) => {
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

  //   const onChange = (e) =>
  //     setFormData({ ...formData, [e.target.name]: e.target.value });

  //   const onSubmit = (e) => {
  //     e.preventDefault();
  //     editProfile(formData);
  //   };

  return (
    <Fragment>
      <Navbar />

      {lawyerprofiles_to_compare ? (
        <div className='login_bg99'>
          <div
            className='float-container'
            style={{ backgroundColor: '#e6d9cc' }}
          >
            <div className='login_form_div98765' className='float-child blue'>
              <div className='editprotop'>
                <div className='myrectop_cont'>
                  <span className='futura'>
                    <span className='futuraa'>Profile 1</span>
                  </span>
                </div>
                <hr className='myrechr1' />

                {lawyerprofiles_to_compare[0] ? (
                  <img
                    className='myimg'
                    src={lawyerprofiles_to_compare[0].image}
                    onError={{ src: { user } }}
                  ></img>
                ) : (
                  ''
                )}
              </div>
              <br />
              <form>
                <div className='row editprorows'>
                  <div className='col-lg-3 editprotext2'>Username:</div>
                  <div className='col-lg-9'>
                    <input
                      className='editproinput2'
                      type='text'
                      placeholder='UserName'
                      name='name'
                      value={lawyerprofiles_to_compare[0].user.name}
                    />
                  </div>
                </div>
                <div className='row editprorows'>
                  <div className='col-lg-3 editprotext2'>Emails:</div>
                  <div className='col-lg-9'>
                    <input
                      className='editproinput2'
                      type='text'
                      placeholder='email'
                      name='email'
                      value={lawyerprofiles_to_compare[0].user.email}
                    />
                  </div>
                </div>
                <div className='row editprorows'>
                  <div className='col-lg-3 editprotext2'>
                    Enrollment Number:
                  </div>
                  <div className='col-lg-9'>
                    <input
                      className='editproinput2'
                      type='text'
                      placeholder='enrollmentno'
                      name='enrollmentno'
                      value={lawyerprofiles_to_compare[0].user.enrollmentno}
                    />
                  </div>
                </div>
                <div className='row editprorows'>
                  <div className='col-lg-3 editprotext2'>State:</div>
                  <div className='col-lg-9'>
                    <input
                      className='editproinput2'
                      type='text'
                      placeholder='state'
                      name='state'
                      value={lawyerprofiles_to_compare[0].user.state}
                    />
                  </div>
                </div>

                <div className='row editprorows'>
                  <div className='col-lg-3 editprotext2'>Address:</div>
                  <div className='col-lg-9'>
                    <div>
                      <input
                        className='editproinput2'
                        type='text'
                        placeholder='Locality'
                        name='locality'
                        value={lawyerprofiles_to_compare[0].address.locality}
                      />
                    </div>

                    <div>
                      <input
                        className='editproinput2'
                        type='text'
                        placeholder='City'
                        name='city'
                        value={lawyerprofiles_to_compare[0].address.city}
                      />
                    </div>

                    <div>
                      <input
                        className='editproinput2'
                        type='text'
                        placeholder='Pincode'
                        name='pincode'
                        value={lawyerprofiles_to_compare[0].address.pincode}
                      />
                    </div>
                  </div>
                </div>
                <div className='row editprorows'>
                  <div className='col-lg-3 editprotext2'>Licensed Year:</div>
                  <div className='col-lg-9'>
                    <input
                      className='editproinput2'
                      type='text'
                      placeholder='Licensed Year'
                      name='licensed_year'
                      value={lawyerprofiles_to_compare[0].licensed_year}
                    />
                  </div>
                </div>
                <div className='row editprorows'>
                  <div className='col-lg-3 editprotext2'>Advance Price:</div>
                  <div className='col-lg-9'>
                    <input
                      className='editproinput2'
                      type='text'
                      placeholder='Price'
                      name='price'
                      value={lawyerprofiles_to_compare[0].price}
                    />
                  </div>
                </div>
                <div className='row editprorows'>
                  <div className='col-lg-3 editprotext2'>Experience:</div>
                  <div className='col-lg-9'>
                    <textarea
                      rows={20}
                      name='experience'
                      className='editproinput2'
                      value={lawyerprofiles_to_compare[0].experience}
                    />
                  </div>
                </div>
                <br />
                <div>
                  <br />
                  <br />
                  <br />
                  <br />
                </div>
              </form>
            </div>

            <div className='login_form_div98765' className='float-child black'>
              <div className='editprotop'>
                <div className='myrectop_cont'>
                  <span className='futura'>
                    <span className='futuraa'>Profile 2</span>
                  </span>
                </div>
                <hr className='myrechr1' />

                {lawyerprofiles_to_compare[1] ? (
                  <img
                    className='myimg'
                    src={lawyerprofiles_to_compare[1].image}
                    onError={{ src: { user } }}
                  ></img>
                ) : (
                  ''
                )}
              </div>
              <br />
              <form>
                <div className='row editprorows'>
                  <div className='col-lg-3 editprotext2'>Username:</div>
                  <div className='col-lg-9'>
                    <input
                      className='editproinput2'
                      type='text'
                      placeholder='UserName'
                      name='name'
                      value={lawyerprofiles_to_compare[1].user.name}
                    />
                  </div>
                </div>
                <div className='row editprorows'>
                  <div className='col-lg-3 editprotext2'>Email:</div>
                  <div className='col-lg-9'>
                    <input
                      className='editproinput2'
                      type='text'
                      placeholder='email'
                      name='email'
                      value={lawyerprofiles_to_compare[1].user.email}
                    />
                  </div>
                </div>
                <div className='row editprorows'>
                  <div className='col-lg-3 editprotext2'>
                    Enrollment Number:
                  </div>
                  <div className='col-lg-9'>
                    <input
                      className='editproinput2'
                      type='text'
                      placeholder='enrollmentno'
                      name='enrollmentno'
                      value={lawyerprofiles_to_compare[1].user.enrollmentno}
                    />
                  </div>
                </div>
                <div className='row editprorows'>
                  <div className='col-lg-3 editprotext2'>State:</div>
                  <div className='col-lg-9'>
                    <input
                      className='editproinput2'
                      type='text'
                      placeholder='state'
                      name='state'
                      value={lawyerprofiles_to_compare[1].user.state}
                    />
                  </div>
                </div>

                <div className='row editprorows'>
                  <div className='col-lg-3 editprotext2'>Address:</div>
                  <div className='col-lg-9'>
                    <div>
                      <input
                        className='editproinput2'
                        type='text'
                        placeholder='Locality'
                        name='locality'
                        value={lawyerprofiles_to_compare[1].address.locality}
                      />
                    </div>

                    <div>
                      <input
                        className='editproinput2'
                        type='text'
                        placeholder='City'
                        name='city'
                        value={lawyerprofiles_to_compare[1].address.city}
                      />
                    </div>

                    <div>
                      <input
                        className='editproinput2'
                        type='text'
                        placeholder='Pincode'
                        name='pincode'
                        value={lawyerprofiles_to_compare[1].address.pincode}
                      />
                    </div>
                  </div>
                </div>
                <div className='row editprorows'>
                  <div className='col-lg-3 editprotext2'>Licensed Year:</div>
                  <div className='col-lg-9'>
                    <input
                      className='editproinput2'
                      type='text'
                      placeholder='Licensed Year'
                      name='licensed_year'
                      value={lawyerprofiles_to_compare[1].licensed_year}
                    />
                  </div>
                </div>
                <div className='row editprorows'>
                  <div className='col-lg-3 editprotext2'>Advance Price:</div>
                  <div className='col-lg-9'>
                    <input
                      className='editproinput2'
                      type='text'
                      placeholder='Price'
                      name='price'
                      value={lawyerprofiles_to_compare[1].price}
                    />
                  </div>
                </div>
                <div className='row editprorows'>
                  <div className='col-lg-3 editprotext2'>Experience:</div>
                  <div className='col-lg-9'>
                    <textarea
                      rows={20}
                      name='experience'
                      className='editproinput2'
                      value={lawyerprofiles_to_compare[1].experience}
                    />
                  </div>
                </div>
                <br />
                <div>
                  <br />
                  <br />
                  <br />
                  <br />
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </Fragment>
  );
};

Compare.propTypes = {
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, null)(Compare);
