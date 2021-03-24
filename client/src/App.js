import React, { useEffect } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

// screens
import Error404 from './screens/Error404Screen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/Home/HomeScreen';
import ExploreScreen from './screens/Explore';
import NewPostPage from './screens/NewPost';
import EditProfilePage from './screens/SettingsScreen';
import PostPage from './screens/PostPage';

import { useHistory } from 'react-router-dom';
import * as Routes from './component/routes';
import { loaduser } from './redux/Actions/userActions';
import { connect } from 'react-redux';
import ErrorBoundary from './component/ErrorBounday';
// import UserProfile from './screens/UserProfile';

import { connectSocketIo } from './redux/Socket/socketActions';
import ProfilePage from './screens/ProfilePage';
import NavigationHeader from './component/NavigationHeader';

const token = localStorage.getItem('authToken');
function App({ loaduser, connectSocketIo }) {
  const {
    history,
    location: { pathname },
  } = useHistory();

  useEffect(() => {
    let subscribe = true;
    if (subscribe) {
      if (token) {
        connectSocketIo();
        loaduser(history);
      }
    }
    return () => (subscribe = null);
  }, [loaduser]);

  // useEffect(() => {
  //   let subscribe = true;
  //   if (subscribe) {
  //     if (token) {
  //     }
  //   }
  //   return () => subscribe = null;
  // }, [loaduser]);

  return (
    <div className="App">
      {pathname !== Routes.Login &&
        pathname !== Routes.SignUp &&
        pathname !== Routes.NewPostPage && <NavigationHeader />}
      <ErrorBoundary>
        <Switch>
          <Route exact path={Routes.Login} render={() => <LoginScreen />} />
          <Route exact path={Routes.SignUp} render={() => <SignUpScreen />} />
          <Route exact path={Routes.Dashboard} render={() => <HomeScreen />} />
          <Route exact path={Routes.Explore} render={() => <ExploreScreen />} />

          <Route exact path={Routes.NewPostPage} component={NewPostPage} />
          <Route exact path={`${Routes.PostPage}/:postId`} component={PostPage} />
          <Route exact path={`${Routes.ProfilePage}/:username`} component={ProfilePage} />
          <Route path={Routes.SettingsPage} component={EditProfilePage} />
          {/* <Route exact path={Routes.ProfilePage} component={UserProfile} /> */}
          <Route component={Error404} />
        </Switch>
      </ErrorBoundary>
    </div>
  );
}

export default connect(null, { loaduser, connectSocketIo })(App);
