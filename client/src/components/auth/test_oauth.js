import * as queryString from 'query-string';
import axios from 'axios';
import React, { Component, Fragment, useState, useEffect } from 'react';

export class Oauth extends Component {
  render() {
    // async function getAccessTokenFromCode(code) {
    //   const { data } = await axios({
    //     url: `https://oauth2.googleapis.com/token`,
    //     method: 'post',
    //     data: {
    //       client_id: process.env.APP_ID_GOES_HERE,
    //       client_secret: process.env.APP_SECRET_GOES_HERE,
    //       redirect_uri: 'https://www.example.com/authenticate/google',
    //       grant_type: 'authorization_code',
    //       code
    //     }
    //   });
    //   console.log(data); // { access_token, expires_in, token_type, refresh_token }
    //   return data.access_token;
    // }

    const stringifiedParams = queryString.stringify({
      client_id:
        '942690442222-rj9qhp7ktps8j0q6epsvli33kcbh5sus.apps.googleusercontent.com',
      redirect_uri: 'http://localhost:3000/dashboard2/',
      scope: ['https://www.googleapis.com/auth/drive.metadata.readonly'],
      discoveryDocs: [
        'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'
      ], // space seperated string
      response_type: 'code',
      access_type: 'offline',
      prompt: 'consent'
    });

    const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;

    // const urlParams = queryString.parse(window.location.search);
    // if (urlParams.error) {
    //   console.log(`An error occurred: ${urlParams.error}`);
    // } else {
    //   console.log(`The code is: ${urlParams.code}`);
    // }

    // const code = getAccessTokenFromCode(urlParams.code);
    // console.log(code);

    return (
      <Fragment>
        <a href={googleLoginUrl}>Login with Google</a>
      </Fragment>
    );
  }
}

export default Oauth;
