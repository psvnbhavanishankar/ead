import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { postComment, getComments_2 } from '../../actions/comments';
import { getPostById_2 } from '../../actions/posts';
import { Link, Redirect } from 'react-router-dom';
import './options2.css';
import Navbar from '../layout/Navbar';
export class UploadComment extends Component {
  state = {
    content: '',
  };

  static propTypes = {
    postComment: propTypes.func.isRequired,
    getPostById_2: propTypes.func.isRequired,
    getComments_2: propTypes.func.isRequired,
    auth: propTypes.object.isRequired,
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    const { isAuthenticated, user } = this.props.auth;
    const { content } = this.state;
    var post = this.props.posts.post._id;
    this.props.postComment(post, content);
    this.props.getPostById_2(post);
    this.props.getComments_2(post);
  };

  render() {
    if (
      this.props.posts &&
      this.props.comments &&
      this.props.comments.get_comments_2 &&
      this.props.posts.get_post_2 &&
      this.props.comments.post_comment
    ) {
      return <Redirect push to='/post' />;
    }
    const { title, content } = this.state;
    return (
      <Fragment>
        <Navbar />
        <div className='back1'>
          <div className='container2'>
            <div className='card3'>
              <div className='card-header'>
                <div className='row' style={{ textAlign: 'center' }}>
                  <h4 className='col-12'>
                    UPLOAD COMMENT&nbsp;
                    <i className='fa fa-pen-alt' />
                  </h4>
                </div>
              </div>
              <br />
              <div className='card-body'>
                <form onSubmit={this.onSubmit}>
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
                      placeholder='Enter comment'
                      onChange={this.onChange}
                      value={content}
                    />
                  </div>
                  <br />
                  <br />
                  <div className='row2' style={{ paddingLeft: '20%' }}>
                    <button className='log_btn7' type='submit'>
                      Upload Comment
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
  comments: state.comments,
  posts: state.posts,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  postComment,
  getComments_2,
  getPostById_2,
})(UploadComment);
