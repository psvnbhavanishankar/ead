import * as queryString from 'query-string';
import axios from 'axios';
import React, { Component, Fragment, useState, useEffect } from 'react';

export class Dashboard2 extends Component {
  render() {
    async function getAccessTokenFromCode(code) {
      const { data } = await axios({
        url: `https://oauth2.googleapis.com/token`,
        method: 'post',
        data: {
          client_id:
            '942690442222-rj9qhp7ktps8j0q6epsvli33kcbh5sus.apps.googleusercontent.com',
          client_secret: 'lbgf42pGG4gN8RfJZqvHmcei',
          redirect_uri: 'http://localhost:3000/dashboard2/',
          grant_type: 'authorization_code',
          code
        }
      });
      console.log(data); // { access_token, expires_in, token_type, refresh_token }
      return data.access_token;
    }

    async function getGoogleDriveFiles(access_token) {
      console.log(access_token);
      const { data2 } = await axios({
        url: 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
        method: 'get',
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      console.log(data2); // { id, email, given_name, family_name }
      return data2;
    }

    const urlParams = queryString.parse(window.location.search);
    if (urlParams.error) {
      console.log(`An error occurred: ${urlParams.error}`);
    } else {
      console.log(`The code is: ${urlParams.code}`);
    }

    getAccessTokenFromCode(urlParams.code).then(datum => {
      console.log(datum);
      getGoogleDriveFiles(datum).then(result => {
        console.log(result);
      });
    });

    // getGoogleDriveFiles(datum).then(result => {
    //   console.log(result);
    // });
    // console.log(data);

    return <div>Dashboard</div>;
  }
}

// Dashboard.propTypes = {};

export default Dashboard2;
