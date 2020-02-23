import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import "./navbar.css";

const Navbar2 = () => {
  const authLinks = (
    <Fragment>
      <div
        className="navbar fixed-top navbar-expand-lg navbar-dark"
        style={{ backgroundColor: "#000000" }}
      >
        <div
          className="Dummynav-item nav-link active"
          style={{ padding: "0px" }}
        >
          <a href="/">
            <img
              src="https://i.ibb.co/mvYK8k6/Nav-logo-01.png"
              alt="Nav-logo-01"
              border="0"
              style={{ width: "22%" }}
            />
          </a>
        </div>
      </div>
    </Fragment>
  );

  const guestLinks = (
    <div
      className="navbar fixed-top navbar-expand-lg navbar-dark"
      style={{ backgroundColor: "#000000" }}
    >
      <div className="Dummynav-item nav-link active" style={{ padding: "0px" }}>
        <a href="/">
          <img
            src="https://i.ibb.co/mvYK8k6/Nav-logo-01.png"
            alt="Nav-logo-01"
            border="0"
            style={{ width: "23%" }}
          />
        </a>
      </div>
    </div>
  );

  return (
    <Fragment>
      <Fragment>{guestLinks}</Fragment>
    </Fragment>
  );
};

export default Navbar2;
