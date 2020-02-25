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
  getCurrentProfile
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
    avatar: ''
    // following: "",
    // followers: ""
  });

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      locality:
        loading || !profile.address.locality ? '' : profile.address.locality,
      city: loading || !profile.address.city ? '' : profile.address.city,
      pincode:
        loading || !profile.address.pincode ? '' : profile.address.pincode,
      // dob: loading || !profile.dob ? "" : profile.dob,
      // mobile: loading || !profile.mobile ? "" : profile.mobile,
      name: loading || !profile.user.name ? '' : profile.user.name,
      email: loading || !profile.user.email ? '' : profile.user.email,
      avatar: loading || !profile.user.avatar ? '' : profile.user.avatar
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
    avatar
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    editProfile(formData);
  };

  return (
    <Fragment>
      <Navbar />
      <br />
      <br />
      <div className='editprotop'>
        <div className='myrectop_cont'>Edit your profile</div>
        <hr className='myrechr1' />
      </div>
      <div className='editpro_bg'>
        <br />
        <br />
        <br />
        <div className='container'>
          <div className='row editprobot'>
            <div className='col-lg-8'>
              <form onSubmit={e => onSubmit(e)}>
                <div className='row editprorows'>
                  <div className='col-lg-3 editprotext'>Username:</div>
                  <div className='col-lg-9'>
                    <input
                      className='editproinput'
                      type='text'
                      placeholder='UserName'
                      name='name'
                      value={name}
                      onChange={e => onChange(e)}
                    />
                  </div>
                </div>
                <div className='row editprorows'>
                  <div className='col-lg-3 editprotext'>Email:</div>
                  <div className='col-lg-9'>
                    <input
                      className='editproinput'
                      type='text'
                      placeholder='email'
                      name='email'
                      value={email}
                      onChange={e => onChange(e)}
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
                  <div className='col-lg-3 editprotext'>Image:</div>
                  <div className='col-lg-9'>
                    <input
                      className='editproinput'
                      type='image'
                      placeholder='image'
                      name='image'
                      value={avatar}
                      onChange={e => onChange(e)}
                    />
                  </div>
                </div>
                <div className='row editprorows'>
                  <div className='col-lg-3 editprotext'>Address:</div>
                  <div className='col-lg-9'>
                    <div>
                      <input
                        className='editproinput'
                        type='text'
                        placeholder='Locality'
                        name='locality'
                        value={locality}
                        onChange={e => onChange(e)}
                      />
                    </div>

                    <div>
                      <input
                        className='editproinput'
                        type='text'
                        placeholder='City'
                        name='city'
                        value={city}
                        onChange={e => onChange(e)}
                      />
                    </div>

                    <div>
                      <input
                        className='editproinput'
                        type='text'
                        placeholder='Pincode'
                        name='pincode'
                        value={pincode}
                        onChange={e => onChange(e)}
                      />
                    </div>
                  </div>
                </div>
                <br />
                <div>
                  <button className='editprobtn' type='submit'>
                    Save
                  </button>
                  <br />
                  <br />
                  <br />
                  <br />
                </div>
              </form>
            </div>
            <div className='col-lg-4' style={{ paddingTop: '3%' }}>
              <button className='editprobtn2' onClick={() => deleteAccount()}>
                <i className='fas fa-trash'></i> &nbsp; Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

EditProfile.propTypes = {
  editProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { editProfile, getCurrentProfile })(
  EditProfile
);
