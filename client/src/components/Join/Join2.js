import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { getCurrentProfile, getLawyerProfile } from '../../actions/profile';
import { getJoinInfo } from '../../actions/join';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

import './Join.css';

const Join = ({
  profile: { lawyerprofile, loading },
  join: { get_array, loading2 },
  getLawyerProfile,
  getJoinInfo,
}) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  // useEffect(() => {
  //   getLawyerProfile();
  // }, []);
  useEffect(() => {
    getJoinInfo();
  }, []);

  return !loading && !loading2 ? (
    lawyerprofile && lawyerprofile.user && lawyerprofile.user.name ? (
      <div className='joinOuterContainer'>
        <div className='joinInnerContainer2'>
          <h1 className='heading'>Join</h1>

          <div>
            <input
              className='joinInput'
              type='text'
              value={lawyerprofile.user.name}
            />
          </div>
          {/* <div>
            <input
              placeholder='Room'
              className='joinInput mt-20'
              type='text'
              onChange={(event) => setRoom(event.target.value)}
            />
          </div> */}

          <select
            className='joinInput mt-20'
            onChange={(event) => setRoom(event.target.value)}
          >
            <option value='' disabled selected>
              Select the Client
            </option>
            {get_array
              ? get_array.map((fbb) => <option value={fbb}>{fbb}</option>)
              : ''}
            ;
          </select>

          <Link
            onClick={(e) =>
              !lawyerprofile.user.name || !room ? e.preventDefault() : null
            }
            to={`/chat2?name=${lawyerprofile.user.name}&room=${room}`}
          >
            <button className={'button mt-20'} type='submit'>
              Sign In
            </button>
          </Link>
        </div>
      </div>
    ) : (
      ''
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
  getJoinInfo,
  getLawyerProfile,
})(Join);
