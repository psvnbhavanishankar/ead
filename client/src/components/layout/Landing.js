import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Landing = () => {
  return (
    <Fragment>
      <Navbar />
      <section className='landing'>
        {/* <div className='dark-overlay'> */}
        <div className='landing-inner'>
          <h1 className='x-large'>
            Online Legal <span className='firm1'>Firm</span>,
            <br />
            <span className='firm1'>Legal.</span> Easier.
          </h1>
          <p className='lead'></p>
          <div className='buttons'>
            <Link to='/register' className='btn'>
              SIGN UP
            </Link>
            <Link to='/verify' className='btn'>
              AS LAWYER
            </Link>
            <Link to='/login' className='btn'>
              LOGIN
            </Link>
          </div>
        </div>
        {/* </div> */}
      </section>
    </Fragment>
  );
};

export default Landing;
