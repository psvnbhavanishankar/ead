import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { getPosts, getPostById } from '../../actions/posts';
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import './posts.css';

export class Comments extends Component {
  static propTypes = {
    posts: propTypes.object.isRequired,
    comments: propTypes.object.isRequired,
    getPosts: propTypes.func.isRequired,
    getPostById: propTypes.func.isRequired,
  };

  componentDidMount() {
    const { user } = this.props.auth;
    this.props.getPosts();
  }

  render() {
    return (
      <Fragment>
        <Navbar />
        <div className='back1000'>
          <br />
          <div>
            <div className='container'>
              <div className='container3'>
                <center>
                  <span className='futura'>Post</span>
                </center>
                <div
                  className='card'
                  key={this.props.posts.post._id}
                  style={{ margin: '30px', border: 'none' }}
                >
                  <div
                    className='card-header'
                    style={{ backgroundColor: '#fff', color: 'black' }}
                  >
                    <div className='row'>
                      <div className='col-6'>{this.props.posts.post.title}</div>
                      &nbsp;&nbsp;&nbsp;&nbsp; By{' '}
                      <div className='col-2'>
                        {this.props.posts.post.author &&
                        this.props.posts.post.author.name
                          ? this.props.posts.post.author.name
                          : ''}
                      </div>
                      at{' '}
                      <div className='col-4'>
                        {this.props.posts.post.createdAt}
                      </div>
                    </div>
                  </div>

                  <div className='card-body'>
                    {this.props.posts.post.content}
                  </div>
                </div>
                <br />
              </div>
            </div>
          </div>

          <div className='container'>
            <div className='container3'>
              <center>
                <Link push to='/upload_comment'>
                  <button class='log_btn20'>Upload a comment</button>
                </Link>
                <br />
                <span className='futura'>
                  <span className='futuraa'>Comments</span>
                </span>
              </center>
              {this.props.comments && this.props.comments.comments
                ? this.props.comments.comments.map((comment) => (
                    <div
                      className='card'
                      key={comment.id}
                      style={{ margin: '30px', border: 'none' }}
                    >
                      <div className='card-header' style={{ color: 'black' }}>
                        <div className='row'>
                          <div className='col-6'>{comment.content}</div>
                          &nbsp;&nbsp;&nbsp;&nbsp; By{' '}
                          <div className='col-2'>
                            {comment.author && comment.author.name
                              ? comment.author.name
                              : ''}
                          </div>
                          at <div className='col-4'>{comment.timestamp}</div>
                        </div>
                      </div>

                      <br />
                    </div>
                  ))
                : ''}
              <br />
            </div>
          </div>
          <br />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts,
  auth: state.auth,
  comments: state.comments,
});

export default connect(mapStateToProps, { getPosts, getPostById })(Comments);
