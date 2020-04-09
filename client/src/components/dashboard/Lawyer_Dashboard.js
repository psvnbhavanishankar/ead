import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from '../layout/Navbar3';
import { getMyCases, getClientCases } from '../../actions/cases';
import './posts.css';

const Lawyer_Dashboard = ({
  getMyCases,
  auth: { user, isAuthenticated },
  cases: { mycases },
}) => {
  useEffect(() => {
    getMyCases();
  }, []);
  return (
    <Fragment>
      <Navbar />
      <br />
      <div className='back10'>
        <br />
        <div className='container'>
          <div className='container3'>
            <br />
            <center>
              <span className='futura'>
                Your<span className='futuraa'> Cases</span>
              </span>
            </center>

            {mycases
              ? mycases.map((instance) => (
                  <center>
                    <div
                      className='card'
                      style={{
                        margin: '50px',
                        border: 'none',
                      }}
                    >
                      <br />
                      <div className='card-header'>
                        <span className='jas'>Title : </span> {instance.title}
                      </div>
                      <div className='card-body'>
                        <div className='dos'>
                          {instance.description.map((desc) => (
                            <p>{desc}</p>
                          ))}
                        </div>
                        <div className='dos'>
                          <span className='jas'>Client : </span>
                          {instance.client.name}
                        </div>
                        <div className='dos'>
                          <span className='jas'>Lawyer : </span>
                          {instance.lawyer.name}
                        </div>
                        <br />
                      </div>
                    </div>
                  </center>
                ))
              : ''}
            <br />
          </div>
        </div>
        <br />
      </div>
    </Fragment>
  );
};

Lawyer_Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  cases: PropTypes.object.isRequired,
  getMyCases: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  cases: state.cases,
});

export default connect(mapStateToProps, {
  getMyCases,
})(Lawyer_Dashboard);
