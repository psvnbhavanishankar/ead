import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editProfile, getCurrentProfile } from '../../actions/profile';
import { Link, withRouter } from 'react-router-dom';
import { deleteAccount } from '../../actions/profile';
import { createMessage } from '../../actions/messages';
import Navbar from '../layout/Navbar';
import Spinner from '../layout/Spinner';
import './editprofile.css';
import img from './user.png';

const EditProfile = ({
  profile: { profile, loading, edit },
  editProfile,
  getCurrentProfile,
  createMessage,
}) => {
  const [formData, setFormData] = useState({
    locality: '',
    city: '',
    pincode: '',
    image: '',
    // skills: "",
    // dob: "",
    // mobile: "",
    name: '',
    email: '',
    image: '',
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
      image: loading || !profile.image ? '' : profile.image,
      // dob: loading || !profile.dob ? "" : profile.dob,
      // mobile: loading || !profile.mobile ? "" : profile.mobile,
      name: loading || !profile.user.name ? '' : profile.user.name,
      email: loading || !profile.user.email ? '' : profile.user.email,
      // avatar: loading || !profile.user.avatar ? '' : profile.user.avatar,
    });
  }, [loading]);

  const {
    locality,
    city,
    pincode,
    image,
    // skills,
    // dob,
    // mobile,
    name,
    email,
  } = formData;
  var image_content = '';

  function refreshPage() {
    window.location.reload();
  }

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onChange2 = (e) => {
    let files = e.target.files[0];
    console.log(e.target.files[0]);

    let reader = new FileReader();
    reader.readAsDataURL(files);

    reader.onload = (e) => {
      image_content = e.target.result;
      console.log(image_content);
    };
    console.log(image_content);
    console.log(e.target.name);
  };
  var data;

  const onSubmit = (e) => {
    e.preventDefault();
    if (image_content) {
      data = {
        locality,
        city,
        pincode,
        // skills,
        // dob,
        image: image_content,
        image_content,

        name,
        email,
      };
    } else {
      data = {
        locality,
        city,
        pincode,
        // skills,
        // dob,

        name,
        email,
        image_content,
      };
    }
    createMessage({
      profile: 'Profile Updated Succesfully',
    });
    createMessage({
      wait: 'Updating. Please wait.',
    });
    editProfile(data);
  };

  if (edit) {
    createMessage({
      profile: 'Profile Updated Succesfully',
    });
    refreshPage();
  }

  return !loading && profile ? (
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
              {profile ? (
                <img
                  className='myimg'
                  src={profile.image}
                  onError={{ src: { img } }}
                ></img>
              ) : (
                ''
              )}
              <div className='container'>
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
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input
                          className='editproinput'
                          type='file'
                          name='image'
                          accept='image/jpeg, image/jpg, image/png'
                          onChange={(e) => onChange2(e)}
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
      }
    </Fragment>
  ) : (
    <Spinner />
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

export default connect(mapStateToProps, {
  editProfile,
  getCurrentProfile,
  createMessage,
})(EditProfile);
