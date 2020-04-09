import React, { useEffect, Fragment } from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFields, postFields } from '../../actions/fields';
import { setAlert } from '../../actions/alert';
import { createMessage } from '../../actions/messages';
import './options.css';
import personalinjury from '../../img/practice-3.jpg';
import familylaw from '../../img/practice-4.jpg';
import employmentlaw from '../../img/practice-6.jpg';
import bankandfinancial from '../../img/practice-2.jpg';
import capitalmarket from '../../img/practice-5.jpg';
import accidents from '../../img/practice-1.jpg';
import disputeresolution from '../../img/practice-8.jpg';
import corporate from '../../img/practice-7.jpg';
import Navbar from '../layout/Navbar3';

// import Navbar from './Navbar';

const Fields = ({
  getFields,
  postFields,
  createMessage,
  auth,
  fields: { fields, post_fields },
  onSubmit,
}) => {
  useEffect(() => {
    getFields();
  }, []);
  const selected_fields = {
    user_id: auth.user,
    selected: [],
  };

  onSubmit = (e) => {
    e.preventDefault();
    postFields(selected_fields);
    createMessage({
      fieldsSelected: 'Your fields of experience have been noted!',
    });
    // return <Redirect to='/dashboard' />;
  };

  const onChange = function (id) {
    if (fields && fields.fields) {
      if (document.getElementById(id).checked === true) {
        for (var i = 0; i < fields.fields.length; i++) {
          if (fields.fields[i].name === id) {
            if (!selected_fields.selected.includes(fields.fields[i].name)) {
              selected_fields.selected.push(fields.fields[i].name);
            }
          }
        }
      } else if (document.getElementById(id).checked === false) {
        for (i = 0; i < fields.fields.length; i++) {
          if (fields.fields[i].name === id) {
            if (selected_fields.selected.includes(fields.fields[i].name)) {
              const index = selected_fields.selected.indexOf(
                fields.fields[i].name
              );
              selected_fields.selected.splice(index);
            }
          }
        }
      }
    }
  };
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

  if (post_fields) {
    return <Redirect to='/lawyerdashboard' />;
  }

  return (
    <Fragment>
      {
        <Fragment>
          <Navbar />
          <br />
          <br />
          <br />
          <div className='cuisine_bgg'></div>

          <div className='ak1'>
            <div className='container'>
              <div>
                <span class='cuisineheadfutura'>
                  Select your
                  <span class='futuraa'> Fields </span>of Experience
                </span>
                <br />
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
                            id='wrapper'
                            class='recipe'
                            style={{ overflow: 'hidden' }}
                            id='MyElement'
                          >
                            <img
                              style={{ width: '150%' }}
                              src={array[count++]}
                            />

                            {/* {(count = count + 1)} */}

                            <label style={{ width: '93%' }}>
                              <div
                                className='row'
                                style={{ paddingTop: '10px' }}
                              >
                                <div className='col-lg-10'>
                                  <div class='cuisinekarla'>{field.name}</div>
                                </div>
                                <div className='col-lg-2'>
                                  <input
                                    id={field.name}
                                    name={field.name}
                                    type='checkbox'
                                    class='cuisineinput'
                                    value={field.name}
                                    onChange={onChange.bind(this, field.name)}
                                  ></input>
                                </div>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <h4>No fields </h4>
                  )}

                  <button className='cuisinesavebtn' type='submit'>
                    SAVE
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Fragment>
      }
    </Fragment>
  );
};

Fields.propTypes = {
  getFields: PropTypes.func.isRequired,
  postFields: PropTypes.func.isRequired,
  createMessage: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired,
  post_fields: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  fields: state.fields,
});

export default connect(mapStateToProps, {
  getFields,
  postFields,
  createMessage,
})(Fields);
