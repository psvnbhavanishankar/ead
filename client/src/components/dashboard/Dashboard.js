import React, { useEffect, Fragment } from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFields, postFields } from '../../actions/fields';
import { getLawyerbyField } from '../../actions/profile';
import { setAlert } from '../../actions/alert';
import { createMessage } from '../../actions/messages';
import Navbar from '../layout/Navbar';
import './options.css';
import personalinjury from '../../img/practice-3.jpg';
import familylaw from '../../img/practice-4.jpg';
import employmentlaw from '../../img/practice-6.jpg';
import bankandfinancial from '../../img/practice-2.jpg';
import capitalmarket from '../../img/practice-5.jpg';
import accidents from '../../img/practice-1.jpg';
import disputeresolution from '../../img/practice-8.jpg';
import corporate from '../../img/practice-7.jpg';

const Dashboard = ({
  getFields,
  getLawyerbyField,
  auth,
  fields: { fields, post_fields },
  onSubmit,
}) => {
  useEffect(() => {
    getFields();
  }, []);

  var count = 0;

  var array = [
    personalinjury,
    familylaw,
    employmentlaw,
    bankandfinancial,
    capitalmarket,
    accidents,
    disputeresolution,
    corporate,
  ];

  return (
    <Fragment>
      <Navbar />
      {
        <Fragment>
          <div className='cuisine_bg1'></div>

          <div className='ak'>
            <div className='container'>
              <div>
                <span class='cuisineheadfutura1'>
                  Select the
                  <span class='futuraa'> field </span>of the case
                </span>
                <hr class='cuisinehr1' />
              </div>
              <form onSubmit={onSubmit}>
                <div class='row'>
                  {fields && fields.fields ? (
                    fields.fields.map((field) => (
                      <div
                        className='col-lg-3'
                        style={{ paddingBottom: '70px' }}
                      >
                        <div class='cuisinerow2col1cont'>
                          <div
                            class='recipe'
                            style={{ overflow: 'hidden' }}
                            id='MyElement'
                          >
                            <img
                              style={{ width: '120%' }}
                              src={array[count++]}
                            />
                            <label style={{ width: '93%' }}>
                              <div
                                className='row'
                                style={{ paddingTop: '10px' }}
                              >
                                <div className='col-lg-12'>
                                  <div class='cuisinekarla'>
                                    <p
                                      onClick={getLawyerbyField.bind(
                                        this,
                                        field.name
                                      )}
                                    >
                                      {' '}
                                      <Link
                                        to={`/profile_by_field/${field.name}`}
                                        style={{
                                          color: 'inherit',
                                          textDecoration: 'inherit',
                                          fontWeight: 'bold',
                                        }}
                                      >
                                        {field.name}{' '}
                                      </Link>
                                    </p>
                                  </div>
                                </div>
                                {/* <div className='col-lg-2'>
                                  <input
                                    id={field.name}
                                    name={field.name}
                                    type='checkbox'
                                    class='cuisineinput'
                                    value={field.name}
                                    // onChange={onChange.bind(this, field.name)}
                                  ></input>
                                </div> */}
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <h4>No fields </h4>
                  )}

                  {/* <button className='cuisinesavebtn' type='submit'>
                    Save
                  </button> */}
                </div>
              </form>
            </div>
          </div>
        </Fragment>
      }
    </Fragment>
  );
};

Dashboard.propTypes = {
  getFields: PropTypes.func.isRequired,
  postFields: PropTypes.func.isRequired,
  createMessage: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired,
  post_fields: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  fields: state.fields,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getFields,
  getLawyerbyField,
  createMessage,
})(Dashboard);
