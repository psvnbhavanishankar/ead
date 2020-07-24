import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { getCurrentProfile, getLawyerProfile } from '../../actions/profile';
import { Join_Client } from '../../actions/join';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import './Join.css';

const Join = ({
  profile: { profile, loading, lawyerprofilebyID },
  getCurrentProfile,
  Join_Client,
  join: { post_join },
}) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('895');
  useEffect(() => {
    getCurrentProfile();
  }, []);

  const onClick = (e) => {
    e.preventDefault();
    const formdata = {
      client: profile.user.name,
      lawyer: lawyerprofilebyID.user._id,
    };
    Join_Client(formdata);
  };

  if (post_join) {
    return (
      <Redirect
        push
        to={`/chat?name=${profile.user.name}&room=${profile.user.name}`}
      />
    );
  }

  return !loading ? (
    profile &&
    profile.user &&
    profile.user.name &&
    lawyerprofilebyID &&
    lawyerprofilebyID.user &&
    lawyerprofilebyID.user.name ? (
      <div className='joinOuterContainer'>
        <div className='joinInnerContainer'>
          <h1 className='heading'>Join</h1>

          <div>
            <input
              className='joinInput'
              type='text'
              value={profile.user.name}
            />
          </div>
          {/* <div>
            <input
              placeholder='Room'
              type='hidden'
              className='joinInput mt-20'
              type='text'
              onChange={(event) => setRoom(event.target.value)}
            />
          </div> */}

          <Link>
            <button
              onClick={(e) => onClick(e)}
              className={'button mt-20'}
              type='submit'
            >
              Join
            </button>
          </Link>
        </div>
      </div>
    ) : (
      <Spinner />
    )
  ) : (
    <Spinner />
  );
};

Join.propTypes = {
  profile: PropTypes.object.isRequired,
  join: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  join: state.join,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  Join_Client,
})(Join);
