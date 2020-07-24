import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProfiles, getLawyerbyID } from '../../actions/profile';
import Navbar from '../layout/Navbar3';
import Spinner from '../layout/Spinner';

// import Header_1 from '../home_page/Header_1';
import './search.css';

export class Searchl extends Component {
  //   static PropTypes = {
  //     profile: PropTypes.Object.isRequired,
  //     getProfiles: PropTypes.func.isRequired,
  //   };

  componentDidMount() {
    this.props.getProfiles();
  }

  constructor() {
    super();
    this.state = {
      search: '',
      personalinjury: false,
      familylaw: false,
      employmentlaw: false,
      bankandfinancial: false,
      capitalmarket: false,
      accidents: false,
      disputeresolution: false,
      corporate: false,
    };
  }

  updateSearch(event) {
    this.setState({ search: event.target.value });
  }

  filterByGenre = (e) => {
    let p = false;
    console.log(e.target.value);
    if (e.target.value == 'false') {
      p = false;
    }
    if (e.target.value == 'true') {
      p = true;
    }
    this.setState({ [e.target.name]: p });
  };

  render() {
    let filteredProfiles = [];

    if (this.props.profile && this.props.profile.lawyerprofiles) {
      for (let i = 0; i < this.props.profile.lawyerprofiles.length; i++) {
        for (
          let j = 0;
          j < this.props.profile.lawyerprofiles[i].practice_areas.length;
          j++
        ) {
          if (
            this.state[
              this.props.profile.lawyerprofiles[i].practice_areas[j]
                .replace(/\s/g, '')
                .toLowerCase()
            ]
          ) {
            filteredProfiles = [
              ...filteredProfiles,
              this.props.profile.lawyerprofiles[i],
            ];
            console.log(666);
            console.log(filteredProfiles);
            console.log(777);
          }
        }
      }
    }

    if (
      filteredProfiles.length === 0 &&
      this.props.profile &&
      this.props.profile.lawyerprofiles
    ) {
      console.log(888);
      console.log(filteredProfiles.length);
      console.log(999);
      filteredProfiles = this.props.profile.lawyerprofiles.filter((allwork) => {
        return (
          allwork.user.name.toLocaleLowerCase().indexOf(this.state.search) !==
            -1 ||
          allwork.user.email.toLocaleLowerCase().indexOf(this.state.search) !==
            -1
        );
      });
    }

    if (
      filteredProfiles.length &&
      this.props.profile &&
      this.props.profile.lawyerprofiles
    ) {
      filteredProfiles = filteredProfiles.filter((allwork) => {
        return (
          allwork.user.name.toLocaleLowerCase().indexOf(this.state.search) !==
            -1 ||
          allwork.user.email.toLocaleLowerCase().indexOf(this.state.search) !==
            -1
        );
      });

      if (this.props.profile && this.props.profile.lawyerprofilebyID) {
        return <Redirect push to='viewLprofile' />;
      }
    }
    return this.props.profile && this.props.profile.lawyerprofiles ? (
      <Fragment>
        <Navbar />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className='abhi3'>
          <div
            classname='abhi'
            style={{ marginLeft: '300px', marginRight: '300px' }}
          >
            <input
              type='text'
              placeholder='Search for any Name/Author....'
              value={this.state.search}
              onChange={this.updateSearch.bind(this)}
              className='form-control '
              style={{
                fontFamily: 'Raleway',
                fontSize: 'large',
                color: 'black',
                border: '3px solid black',
                borderRadius: '30px',
                paddingLeft: '30px',
              }}
            />
          </div>
          <br />
          <div style={{ marginLeft: '600px' }}>
            <div className='dropright'>
              <button
                className='btn btn-outline-dark dropdown-toggle abhi2'
                type='button'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
              >
                Select Category
              </button>
              <div
                className='dropdown-menu scrollable-menu'
                aria-labelledby='dropdownMenuButton'
              >
                <div
                  className='dropdown-item'
                  style={{
                    fontFamily: 'Raleway',
                  }}
                >
                  <input
                    type='checkbox'
                    name='personalinjury'
                    value={!this.state['personalinjury']}
                    onChange={this.filterByGenre}
                  />
                  &nbsp; Personal Injury
                </div>
                <div className='dropdown-divider' />
                <div
                  className='dropdown-item'
                  style={{
                    fontFamily: 'Raleway',
                  }}
                >
                  <input
                    type='checkbox'
                    name='familylaw'
                    value={!this.state['familylaw']}
                    onChange={this.filterByGenre}
                  />
                  &nbsp; Family Law
                </div>
                <div className='dropdown-divider' />
                <div
                  className='dropdown-item'
                  style={{
                    fontFamily: 'Raleway',
                  }}
                >
                  <input
                    type='checkbox'
                    name='employmentlaw'
                    value={!this.state['employmentlaw']}
                    onChange={this.filterByGenre}
                  />
                  &nbsp; Employment Law
                </div>
                <div className='dropdown-divider' />
                <div
                  className='dropdown-item'
                  style={{
                    fontFamily: 'Raleway',
                  }}
                >
                  <input
                    type='checkbox'
                    name='bankandfinancial'
                    value={!this.state['bankandfinancial']}
                    onChange={this.filterByGenre}
                  />
                  &nbsp; Bank and Financial
                </div>
                <div className='dropdown-divider' />
                <div
                  className='dropdown-item'
                  style={{
                    fontFamily: 'Raleway',
                  }}
                >
                  <input
                    type='checkbox'
                    name='capitalmarket'
                    value={!this.state['capitalmarket']}
                    onChange={this.filterByGenre}
                  />
                  &nbsp; Capital Market
                </div>
                <div className='dropdown-divider' />
                <div
                  className='dropdown-item'
                  style={{
                    fontFamily: 'Raleway',
                  }}
                >
                  <input
                    type='checkbox'
                    name='accidents'
                    value={!this.state['accidents']}
                    onChange={this.filterByGenre}
                  />
                  &nbsp; Accidents
                </div>
                <div className='dropdown-divider' />
                <div
                  className='dropdown-item'
                  style={{
                    fontFamily: 'Raleway',
                  }}
                >
                  <input
                    type='checkbox'
                    name='disputeresolution'
                    value={!this.state['disputeresolution']}
                    onChange={this.filterByGenre}
                  />
                  &nbsp; Dispute Resolution
                </div>
                <div className='dropdown-divider' />
                <div
                  className='dropdown-item'
                  style={{
                    fontFamily: 'Raleway',
                  }}
                >
                  <input
                    type='checkbox'
                    name='corporate'
                    value={!this.state['corporate']}
                    onChange={this.filterByGenre}
                  />
                  &nbsp; Corporate
                </div>
              </div>
            </div>
          </div>
          <br />

          {/* {filteredProfiles.map(allwork => (
          <tr key={allwork.id}>
            <td>
              <img
                src={allwork.thumbnail}
                width="200"
                alt="thumbnail"
                style={{
                  border: "2px solid #3bbeb6",
                  borderRadius: "5%"
                }}
              />
            </td>
            <td>{allwork.id}</td>
            <td>
              <Link to={`/literature/workdetails/${allwork.id}/`}>
                {allwork.work_title}
              </Link>
              3
            </td>
            <td>{allwork.uploader_id}</td>
            <td>{allwork.author}</td>
          </tr>
        ))} */}

          <div>
            <br />
            <div>
              <div>
                {filteredProfiles.map((allwork) => (
                  <div
                    className='cardaaa'
                    style={{
                      padding: '2%',
                      marginTop: '2%',
                      marginBottom: '2%',
                    }}
                  >
                    <div className='cardaaa-body row'>
                      <div
                        className='col-2'
                        style={{ borderRight: '2px solid #3bbeb6' }}
                      >
                        {/* <img
                  src={allwork.thumbnail}
                  alt='thumbnail'
                  height='240'
                  style={{
                    border: '2px solid #3bbeb6',
                    borderRadius: '5%',
                  }}
                /> */}
                      </div>
                      <div className='col-5'>
                        <blockquote class='blockquote'>
                          {/* link title to ratings page */}
                          <Link
                            className='booktitle'
                            onClick={this.props.getLawyerbyID.bind(
                              this,
                              allwork._id
                            )}
                            style={{ color: 'white' }}
                          >
                            &nbsp;&nbsp;{allwork.user.name}
                          </Link>
                          <div
                            className='bauthor blockquote-footer'
                            style={{ color: 'white' }}
                          >
                            <i className='fa fa-envelope' />
                            &nbsp;&nbsp;{allwork.user.email}
                          </div>
                        </blockquote>
                        <div className='bgenre'>
                          Genre:{' '}
                          {allwork.practice_areas.map((area) => (
                            <div> {area} </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    ) : (
      <Spinner />
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles, getLawyerbyID })(
  Searchl
);
