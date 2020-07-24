import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { getallblogs } from '../../actions/allblogs';
import { Link } from 'react-router-dom';
import Navbar from '../layout/Navbar3';
import Spinner from '../layout/Spinner';
import './posts.css';

export class Search extends Component {
  static propTypes = {
    allblogs: propTypes.object.isRequired,
    getallblogs: propTypes.func.isRequired,
  };

  componentDidMount() {
    const { user } = this.props.auth;
    this.props.getallblogs();
  }

  render() {
    return this.props.allblogs && !this.props.allblogs.loading ? (
      <Fragment>
        <Navbar />
        <div className='back100'>
          <br />
          <div className='container'>
            <div className='container3'>
              <br />
              <center>
                <Link push to='/bloglist'>
                  <button class='log_btn20'>Post a Blog</button>
                </Link>
                <br />
                <span className='futura'>
                  <span className='futuraa'>Blogs</span>
                </span>
              </center>
              {this.props.allblogs && this.props.allblogs.allblogs
                ? this.props.allblogs.allblogs.map((allblog) => (
                    // <tr key={allblog.id}>
                    //   <td />
                    //   <td>{allblog.id}</td>
                    //   <td>
                    //     {allblog.blog_title}
                    //     {/* <Link to={`/literature/workdetails/${allwork.id}/`} />3 */}
                    //   </td>
                    //   <td>{allblog.blog_content}</td>
                    //   <td>{allblog.timestamp}</td>
                    //   <td>{allblog.uploader_id}</td>
                    // </tr>
                    <div
                      className='card'
                      key={allblog.id}
                      style={{ margin: '30px', border: 'none' }}
                    >
                      <div className='card-header' style={{ color: 'black ' }}>
                        <div className='row'>
                          <div
                            className='col-4'
                            style={{
                              color: '#664d34',
                              textDecoration: 'inherit',
                              fontWeight: 'bold',
                              fontSize: '20px',
                            }}
                          >
                            | {allblog.title}
                          </div>
                          <div
                            className='col-4'
                            style={{
                              textAlign: 'right',
                              position: 'relative',
                              left: '150px',
                              fontSize: '18px',
                              fontWeight: 'bold',
                            }}
                          >
                            {allblog.timestamp.substring(0, 10)},{' '}
                            {allblog.timestamp.substring(12, 16)}
                          </div>
                          <br />

                          <div className='row'>
                            <div className='col-12'>
                              &nbsp;&nbsp;&nbsp;By{' '}
                              {allblog.author && allblog.author.email
                                ? allblog.author.email
                                : ''}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* {allblog.id} */}
                      <div
                        className='card-body'
                        style={{
                          fontSize: '18px',
                          fontWeight: 'bold',
                        }}
                      >
                        {' '}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {allblog.content}
                        {/* {Blog.timestamp} */}
                      </div>
                    </div>
                  ))
                : ''}
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
  allblogs: state.allblogs,
  auth: state.auth,
});

export default connect(mapStateToProps, { getallblogs })(Search);
