import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { getBlog, deleteBlog } from '../../actions/Blog';
import Navbar from '../layout/Navbar3';
import './options1.css';
export class Blog extends Component {
  static propTypes = {
    Blog: propTypes.array.isRequired,
    getBlog: propTypes.func.isRequired,
    auth: propTypes.object.isRequired,
    deleteBlog: propTypes.func.isRequired,
  };

  componentDidMount() {
    const { user } = this.props.auth;
    //console.log(user.id);

    this.props.getBlog();
  }

  render() {
    return (
      <Fragment>
        <Navbar />
        <div className='back10'>
          <br />
          <div className='container'>
            <div className='card100' style={{ padding: '2%' }}>
              <div className='card-body'>
                <center>
                  <span className='futura'>
                    <span className='futuraa'>Your</span> Blogs
                  </span>
                </center>
                <br />
                {this.props.Blog.map((Blog) => (
                  <div
                    className='card'
                    key={Blog.id}
                    style={{ marginBottom: '30px' }}
                  >
                    <div className='card-header'>
                      <div className='row'>
                        <div className='col-11'>{Blog.title}</div>
                        <div className='col-11'>{Blog.timestamp}</div>
                        <div className='col-1'>
                          <button
                            onClick={this.props.deleteBlog.bind(
                              this,
                              Blog.title
                            )}
                            className='btn btn-outline-danger'
                          >
                            <i className='fa fa-trash-alt ' />
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* {Blog.id} */}
                    <div className='card-body'>
                      {Blog.content}
                      {/* {Blog.timestamp} */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <br />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  Blog: state.Blog.Blog,
  auth: state.auth,
});

export default connect(mapStateToProps, { getBlog, deleteBlog })(Blog);
