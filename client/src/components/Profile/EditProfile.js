import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editProfile, getCurrentProfile } from '../../actions/profile';
import { Link, withRouter } from 'react-router-dom';
import { deleteAccount } from '../../actions/profile';
import Navbar from '../layout/Navbar';
import './editprofile.css';

const EditProfile = ({
  profile: { profile, loading },
  editProfile,
  getCurrentProfile,
}) => {
  const [formData, setFormData] = useState({
    locality: '',
    city: '',
    pincode: '',
    // skills: "",
    // dob: "",
    // mobile: "",
    name: '',
    email: '',
    avatar: '',
    // following: "",
    // followers: ""
  });

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      locality:
        loading || !(profile.address && profile.address.locality)
          ? ''
          : profile.address.locality,
      city:
        loading || !(profile.address && profile.address.city)
          ? ''
          : profile.address.city,
      pincode:
        loading || !(profile.address && profile.address.pincode)
          ? ''
          : profile.address.pincode,
      // dob: loading || !profile.dob ? "" : profile.dob,
      // mobile: loading || !profile.mobile ? "" : profile.mobile,
      name: loading || !profile.user.name ? '' : profile.user.name,
      email: loading || !profile.user.email ? '' : profile.user.email,
      avatar: loading || !profile.user.avatar ? '' : profile.user.avatar,
    });
  }, [loading]);

  const {
    locality,
    city,
    pincode,
    // skills,
    // dob,
    // mobile,
    name,
    email,
    avatar,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    editProfile(formData);
  };

  return (
    <Fragment>
      <Navbar />

      {
        <div>
          <div className='login_bg2'>
            <div className='login_form_div2'>
              <div className='editprotop'>
                <div className='myrectop_cont'>
                  <span className='futura'>
                    <span className='futuraa'>Edit </span>your profile
                  </span>
                </div>
              </div>
              <div className='container'>
                <div>
                  <div className='col-lg'>
                    <form onSubmit={(e) => onSubmit(e)}>
                      <div className='row editprorows'>
                        <div className='col-lg-3 editprotext'>USERNAME:</div>
                        <div className='col-lg-9'>
                          <input
                            className='editproinput'
                            type='text'
                            placeholder='UserName'
                            name='name'
                            value={name}
                            onChange={(e) => onChange(e)}
                          />
                        </div>
                      </div>
                      <div className='row editprorows'>
                        <div className='col-lg-3 editprotext'>EMAIL:</div>
                        <div className='col-lg-9'>
                          <input
                            className='editproinput'
                            type='text'
                            placeholder='email'
                            name='email'
                            value={email}
                            onChange={(e) => onChange(e)}
                          />
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
                      <div className='row editprorows'>
                        <div className='col-lg-3 editprotext'>IMAGE:</div>
                        <div className='col-lg-9'>
                          <input
                            className='editproinput'
                            type='image'
                            placeholder='image'
                            name='image'
                            value={avatar}
                            onChange={(e) => onChange(e)}
                          />
                        </div>
                      </div>
                      <div className='row editprorows'>
                        <div className='col-lg-3 editprotext'>ADDRESS:</div>
                        <div className='col-lg-9'>
                          <div>
                            <input
                              className='editproinput'
                              type='text'
                              placeholder='Locality'
                              name='locality'
                              value={locality}
                              onChange={(e) => onChange(e)}
                            />
                          </div>

                          <div>
                            <input
                              className='editproinput'
                              type='text'
                              placeholder='City'
                              name='city'
                              value={city}
                              onChange={(e) => onChange(e)}
                            />
                          </div>

                          <div>
                            <input
                              className='editproinput'
                              type='text'
                              placeholder='Pincode'
                              name='pincode'
                              value={pincode}
                              onChange={(e) => onChange(e)}
                            />
                          </div>
                        </div>
                      </div>
                      <br />
                      <div>
                        <button className='editprobtn' type='submit'>
                          SAVE
                        </button>
                        <br />
                        <br />
                      </div>
                    </form>
                    <div className='cak'>
                      <button
                        className='editprobtn2'
                        onClick={() => deleteAccount()}
                      >
                        <i className='fas fa-trash'></i> &nbsp; DELETE ACCOUNT
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </Fragment>
  );
};

EditProfile.propTypes = {
  editProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { editProfile, getCurrentProfile })(
  EditProfile
);
