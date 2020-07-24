import React, { useEffect, Fragment } from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMyCasesasClient, getClientCases } from '../../actions/cases';
import Navbar from '../layout/Navbar';
import Spinner from '../layout/Spinner';
import './mycases.css';
import './posts.css';
const MycasesClient = ({
  getMyCasesasClient,
  auth: { user, isAuthenticated },
  cases: { mycases, loading },
}) => {
  useEffect(() => {
    getMyCasesasClient();
  }, []);
  return mycases && !loading ? (
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

            {mycases.map((instance) => (
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
                    <span
                      style={{
                        color: '#664d34',
                        textDecoration: 'inherit',
                        fontWeight: 'bold',
                        fontSize: '20px',
                      }}
                    >
                      {instance.title}
                    </span>
                  </div>
                  <div className='card-body'>
                    <div className='dos'>
                      {instance.description.map((desc) => (
                        <p>{desc}</p>
                      ))}
                    </div>
                    {/* <div className='dos'>
                      <span className='jas'>Client : </span>
                      {instance.client.name}
                    </div> */}
                    <div className='dos'>
                      <span className='jas'>Lawyer : </span>
                      {instance.lawyer.name}
                    </div>
                    <br />
                  </div>
                </div>
              </center>
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
};

MycasesClient.propTypes = {
  auth: PropTypes.object.isRequired,
  cases: PropTypes.object.isRequired,
  getMyCasesasClient: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  cases: state.cases,
});

export default connect(mapStateToProps, {
  getMyCasesasClient,
})(MycasesClient);
