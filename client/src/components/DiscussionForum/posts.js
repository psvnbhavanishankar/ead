import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { getPosts, getPostById } from '../../actions/posts';
import { getComments } from '../../actions/comments';
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import Spinner from '../layout/Spinner';
import './posts.css';

export class Posts extends Component {
  static propTypes = {
    posts: propTypes.object.isRequired,
    getPosts: propTypes.func.isRequired,
    comments: propTypes.object.isRequired,
    getComments: propTypes.func.isRequired,
    getPostById: propTypes.func.isRequired,
  };

  componentDidMount() {
    const { user } = this.props.auth;
    this.props.getPosts();
  }

  onClick = (e, id) => {
    const { isAuthenticated, user } = this.props.auth;
    e.preventDefault();

    this.props.getPostById(id);
    this.props.getComments(id);
  };

  render() {
    if (
      this.props.posts &&
      this.props.comments &&
      this.props.comments.get_comments &&
      this.props.posts.getpost
    ) {
      return <Redirect push to='/post' />;
    }
    return this.props.posts && this.props.posts.posts ? (
      <Fragment>
        <Navbar />
        <div className='back1000'>
          <br />
          <div className='container'>
            <div className='container3'>
              <br />
              <center>
                <Link push to='/upload_post'>
                  <button class='log_btn20'>Upload a post</button>
                </Link>
                <br />
                <br />

                <span className='futura'>
                  <span className='futuraa'>Posts</span>
                </span>
              </center>

              <br />
              {this.props.posts.posts.map((post) => (
                <div
                  className='card'
                  key={post.id}
                  style={{
                    margin: '30px',
                    border: 'none',
                  }}
                >
                  <div className='card-header' style={{ color: 'black' }}>
                    <div className='row'>
                      <div
                        className='col-6'
                        onClick={(e) => this.onClick(e, post._id)}
                      >
                        <Link
                          style={{
                            color: '#664d34',
                            textDecoration: 'inherit',
                            fontWeight: 'bold',
                            fontSize: '20px',
                          }}
                        >
                          <b>|</b> {''}
                          {post.title}
                        </Link>
                      </div>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <div
                        className='col-4'
                        style={{
                          textAlign: 'right',
                          position: 'relative',
                          left: '120px',
                          fontSize: '18px',
                          fontWeight: 'bold',
                        }}
                      >
                        {post.createdAt.substring(0, 10)},{' '}
                        {post.createdAt.substring(12, 16)}
                      </div>
                    </div>
                    <div className='row'>
                      <br />
                      <div className='col-4'>
                        &nbsp;&nbsp;By{' '}
                        {post.author && post.author.name
                          ? post.author.name
                          : ''}
                      </div>
                    </div>
                  </div>

                  <br />
                </div>
              ))}
              <br />
            </div>
          </div>
          <br />
        </div>
      </Fragment>
    ) : (
      <Spinner />
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts,
  comments: state.comments,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPosts, getPostById, getComments })(
  Posts
);
