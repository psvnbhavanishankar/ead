import React, { useEffect, Fragment } from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFields, postFields } from '../../actions/fields';
import { setAlert } from '../../actions/alert';
import { createMessage } from '../../actions/messages';
import './options.css';
// import Navbar from './Navbar';

const Fields = ({
  getFields,
  postFields,
  createMessage,
  auth,
  fields: { fields, post_fields },
  onSubmit
}) => {
  useEffect(() => {
    getFields();
  }, []);
  const selected_fields = {
    user_id: auth.user,
    selected: []
  };

  onSubmit = e => {
    e.preventDefault();
    postFields(selected_fields);
    createMessage({
      fieldsSelected: 'Your fields of experience have been noted!'
    });
    // return <Redirect to='/dashboard' />;
  };

  const onChange = function(id) {
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

  if (post_fields) {
    return <Redirect to='/lawyerdashboard' />;
  }

  return (
    <Fragment>
      {
        <Fragment>
          <div className='cuisine_bg' style={{ minHeight: '100vh' }}>
            <div class='row cuisinetoprow'>
              <div class='col-lg-4 cuisinelogo'>
                <img
                  class='cuisinelogocont'
                  src='https://i.ibb.co/H7TfPXB/Logo-01.png'
                />
              </div>

              <div class='col-lg-4 cusinerow1col2'>
                <span class='cuisineheadfutura'>
                  Select your Fields of Experience
                </span>
                <hr class='cuisinehr1' />
              </div>
              {/* <div class='col-lg-4 cuisinenext'>
                <Link className='nextattri' to='/lawyerdashboard'>
                  Next&nbsp;&nbsp;
                  <i class='fas fa-arrow-right' style={{ fontSize: '70%' }}></i>
                </Link>
              </div> */}
            </div>
            <br />
            <br />
            <br />
            <br />
            <div className='container'>
              <form onSubmit={onSubmit}>
                <div class='row'>
                  {fields && fields.fields ? (
                    fields.fields.map(field => (
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
                              src='https://i.ibb.co/jg42fmy/28-KITCHEN1-article-Large.jpg'
                            />
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
                    Save
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
  post_fields: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth,
  fields: state.fields
});

export default connect(mapStateToProps, {
  getFields,
  postFields,
  createMessage
})(Fields);
