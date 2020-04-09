import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { postPost } from '../../actions/posts';
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import './options2.css';
export class UploadPost extends Component {
  state = {
    title: '',
    content: '',
  };

  static propTypes = {
    postPost: propTypes.func.isRequired,
    auth: propTypes.object.isRequired,
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const { isAuthenticated, user } = this.props.auth;
    const { title, content } = this.state;
    this.props.postPost(title, content);
  };

  render() {
    if (this.props.posts && this.props.posts.post_post) {
      return <Redirect to='/posts' />;
    }
    const { title, content } = this.state;
    return (
      <Fragment>
        <Navbar />
        <br />
        <br />
        <br />
        <div className='back1'>
          <div className='container2'>
            <div className='card3'>
              <div className='card-header'>
                <div className='row' style={{ textAlign: 'center' }}>
                  <h4 className='col-12'>
                    UPLOAD POST&nbsp;
                    <i className='fa fa-pen-alt' />
                  </h4>
                </div>
              </div>

              <div className='card-body'>
                <form onSubmit={this.onSubmit}>
                  <div className='form-group row'>
                    <label
                      className='col-12'
                      id='ut'
                      style={{ textAlign: 'center' }}
                    >
                      TITLE :
                    </label>
                    <input
                      type='text'
                      className='form-control col-12'
                      name='title'
                      placeholder='Enter post title'
                      onChange={this.onChange}
                      value={title}
                    />
                  </div>
                  <br />
                  <div className='row'>
                    <label
                      className='col-12'
                      id='ut'
                      style={{ textAlign: 'center' }}
                    >
                      CONTENT :
                    </label>
                    <textarea
                      rows={10}
                      className='form-control col-12'
                      name='content'
                      placeholder='Enter post content'
                      onChange={this.onChange}
                      value={content}
                    />
                  </div>
                  <br />
                  <br />
                  <div className='row2' style={{ paddingLeft: '20%' }}>
                    <button className='log_btn7' type='submit'>
                      UploadPost
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts,
  auth: state.auth,
});

export default connect(mapStateToProps, { postPost })(UploadPost);
