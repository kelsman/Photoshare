import React, { useEffect } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

// screens
import Error404 from './screens/Error404Screen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/Home/HomeScreen';
import ExplorePost from './screens/ExplorePost';
import ExploreScreen from './screens/Explore';

import { useHistory } from 'react-router-dom';
import * as Routes from './component/routes';
import { loaduser } from './redux/Actions/userActions';
import { connect } from 'react-redux'


const token = localStorage.getItem('authToken')

function App({ loaduser }) {
  useEffect(() => {
    let subscribe = true;
    if (subscribe) {
      if (token) {
        loaduser()
      }
    }
    return () => subscribe = null;
  });
  return (

    <div className="App">
      <Switch>
        <Route exact path={Routes.Login} render={() => <LoginScreen />} />
        <Route exact path={Routes.SignUp} render={() => <SignUpScreen />} />
        <Route exact path={Routes.Dashboard} render={() => <HomeScreen />} />
        <Route exact path={Routes.Explore} render={() => <ExploreScreen />} />
        <Route exact path={Routes.ExplorePost} component={ExplorePost} />
        <Route component={Error404} />
      </Switch>
    </div>
  );
}

export default connect(null, { loaduser })(App);
