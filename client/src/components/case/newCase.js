import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { postCase } from '../../actions/cases';
import { createMessage } from '../../actions/messages';
import PropTypes from 'prop-types';
import './options1.css';
import Navbar from '../layout/Navbar';

const NewCase = ({ postCase, profile, cases, createMessage }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const { title, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    if (title === '') {
      createMessage({ title_not_null: 'Title should not be empty' });
    } else {
      postCase({
        title,
        description,
        lawyer: profile.lawyerprofilebyID.user._id,
        payment_status: true,
      });
    }
  };

  if (cases.case === 'Case Created Successfully') {
    createMessage({ new_case: 'Details given to lawyer' });
    return <Redirect to='/cases' />;
  }
  return (
    <Fragment>
      <Navbar />
      <br />
      <br />
      <br />
      <div className='back2'>
        <div className='container1'>
          <div className='card2'>
            <div className='card-header'>
              <div className='row' style={{ textAlign: 'center' }}>
                <h4 className='col-12'>
                  Please fill the details&nbsp;
                  <i className='fa fa-pen-alt' />
                </h4>
              </div>
            </div>
            <br />
            <div className='card-body'>
              <form onSubmit={(e) => onSubmit(e)}>
                <div className='form-group row'>
                  <label
                    className='col-12'
                    id='ut'
                    style={{ textAlign: 'left' }}
                  >
                    TITLE :
                  </label>
                  <input
                    type='text'
                    className='form-control col-12'
                    name='title'
                    placeholder='Enter title'
                    onChange={(e) => onChange(e)}
                    value={title}
                  />
                </div>
                <br />
                <div className='row'>
                  <label
                    className='col-12'
                    id='ut'
                    style={{ textAlign: 'left' }}
                  >
                    DESCRIPTION:
                  </label>
                  <textarea
                    rows={10}
                    className='form-control col-12'
                    name='description'
                    placeholder='Enter description'
                    onChange={(e) => onChange(e)}
                    value={description}
                  />
                </div>
                <br />
                <div className='row' style={{ paddingLeft: '20%' }}>
                  <button className='log_btn5' type='submit'>
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

NewCase.propTypes = {
  createMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  cases: state.cases,
});

export default connect(mapStateToProps, { postCase, createMessage })(NewCase);
