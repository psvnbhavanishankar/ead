import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-oldschool-dark';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
// import Navbar2 from './components/layout/Navbar2';

import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';
import Lawyer_Dashboard from './components/dashboard/Lawyer_Dashboard';
import Dashboard from './components/dashboard/Dashboard';
import Dashboard2 from './components/dashboard/Dashboard2';
import Lawyer_Verify from './components/auth/Lawyer_Verify';
import Lawyer_Register from './components/auth/Lawyer_Register';
import ClientProfile from './components/Profile/EditProfile';
import LawyerProfile from './components/Profile/EditLawyerProfile';
import LawyerProfilesByField from './components/Profile/LawyerProfilesByField';
import Fields from './components/fields/fields';
import PaymentPortal from './components/payments/PaymentPortal';
import Oauth from './components/auth/test_oauth';
import Alerts from './components/layout/Alerts';
import Mycases from './components/case/Mycases';
import Posts from './components/DiscussionForum/posts';
import Comments from './components/DiscussionForum/comments';
import UploadPost from './components/DiscussionForum/UploadPost';
import UploadComment from './components/DiscussionForum/UploadComment';
import AllBlogs from './components/AllBlogs/allblogs';
import Blog_Dashboard from './components/Blog/Blog_Dashboard';
import Blog from './components/Blog/Blog';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const alertOptions = {
  timeout: 7000,
  position: 'bottom right',
};

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...alertOptions}>
        <Router>
          <Fragment>
            {/* <Navbar /> */}
            <Route exact path='/' component={Landing} />

            <Alert />
            <Alerts />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/oauth' component={Oauth} />
              <Route
                exact
                path='/lawyer_register'
                component={Lawyer_Register}
              />
              <Route exact path='/verify' component={Lawyer_Verify} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/fields' component={Fields} />
              <Route exact path='/dashboard2' component={Dashboard2} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/mycases' component={Mycases} />
              <PrivateRoute exact path='/allblogs' component={AllBlogs} />
              <PrivateRoute exact path='/myblogs' component={Blog} />
              <PrivateRoute exact path='/posts' component={Posts} />
              <PrivateRoute exact path='/post' component={Comments} />
              <PrivateRoute exact path='/upload_post' component={UploadPost} />
              <PrivateRoute
                exact
                path='/upload_comment'
                component={UploadComment}
              />
              <PrivateRoute
                exact
                path='/profile_by_field/:field'
                component={LawyerProfilesByField}
              />
              <PrivateRoute
                exact
                path='/lawyerdashboard'
                component={Lawyer_Dashboard}
              />
              <PrivateRoute
                exact
                path='/clientprofile'
                component={ClientProfile}
              />
              <PrivateRoute
                exact
                path='/lawyerprofile'
                component={LawyerProfile}
              />
              <PrivateRoute exact path='/bloglist' component={Blog_Dashboard} />
              <PrivateRoute exact path='/pay' component={PaymentPortal} />
            </Switch>
          </Fragment>
        </Router>
      </AlertProvider>
    </Provider>
  );
};

export default App;
