import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { getallblogs } from '../../actions/allblogs';
import { Link } from 'react-router-dom';
import Navbar from '../layout/Navbar3';
import './posts.css';

export class Search extends Component {
  static propTypes = {
    allblogs: propTypes.array.isRequired,
    getallblogs: propTypes.func.isRequired,
  };

  componentDidMount() {
    const { user } = this.props.auth;
    this.props.getallblogs();
  }

  render() {
    return (
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
              {this.props.allblogs.map((allblog) => (
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
                      <div className='col-4' style={{ fontWeight: 'bold' }}>
                        {allblog.title}
                      </div>
                      &nbsp;&nbsp;&nbsp;&nbsp; By{' '}
                      <div className='col-4'>
                        {allblog.author && allblog.author.email
                          ? allblog.author.email
                          : ''}
                      </div>
                      at <div className='col-4'>{allblog.timestamp}</div>
                    </div>
                  </div>
                  {/* {allblog.id} */}
                  <div className='card-body'>
                    {allblog.content}
                    {/* {Blog.timestamp} */}
                  </div>
                </div>
              ))}
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
  allblogs: state.allblogs.allblogs,
  auth: state.auth,
});

export default connect(mapStateToProps, { getallblogs })(Search);
