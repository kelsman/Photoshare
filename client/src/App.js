import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import { useHistory } from 'react-router-dom';
import * as Routes from './component/routes';
import { loaduser } from './redux/Actions/userActions';
import { connect } from 'react-redux';
import ErrorBoundary from './component/ErrorBounday';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
// import UserProfile from './screens/UserProfile';

import { connectSocketIo } from './redux/Socket/socketActions';
// components
import NavigationHeader from './component/NavigationHeader';
import MobileTabMenu from './component/MobileTabMenu';
import Footer from './component/Footer';
import LoadingPage from './screens/LoadingScreen';
import GlobaLoader from './component/GlobalLoader';
// screens

const ErrorPage = lazy(() => import('./screens/Error404Screen'));
const LogInScreen = lazy(() => import('./screens/LoginScreen'));
const SignUpScreen = lazy(() => import('./screens/SignUpScreen'));
const HomeScreen = lazy(() => import('./screens/Home/HomeScreen'));
const ExploreScreen = lazy(() => import('./screens/Explore'));
const NewPostPage = lazy(() => import('./screens/NewPost'));
const EditProfilePage = lazy(() => import('./screens/SettingsScreen'));
const PostPage = lazy(() => import('./screens/PostPage'));
const ProfilePage = lazy(() => import('./screens/ProfilePage'));



const token = localStorage.getItem('authToken');
// Create a client
const queryClient = new QueryClient();

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
    return () => subscribe = null;
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
    <ErrorBoundary>
      <div className="App">
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<LoadingPage />}>
            {pathname !== '/' &&
              pathname !== Routes.SignUp &&
              pathname !== Routes.NewPostPage && <NavigationHeader />}
            <GlobaLoader />
            <Switch>
              <Route exact path={Routes.Login} render={() => <LogInScreen />} />
              <Route exact path={Routes.SignUp} render={() => <SignUpScreen />} />
              <Route exact path={Routes.Dashboard} render={() => <HomeScreen />} />
              <Route exact path={Routes.Explore} render={() => <ExploreScreen />} />

              <Route exact path={Routes.NewPostPage} component={NewPostPage} />
              <Route exact path={`${Routes.PostPage}/:postId`} component={PostPage} />
              <Route exact path={`${Routes.ProfilePage}/:username`} component={ProfilePage} />
              <Route path={Routes.SettingsPage} component={EditProfilePage} />
              {/* <Route exact path={Routes.ProfilePage} component={UserProfile} /> */}
              <Route component={ErrorPage} />
            </Switch>


            {
              pathname !== Routes.SignUp &&
              pathname !== Routes.NewPostPage &&
              < MobileTabMenu />}

          </Suspense>
          <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
      </div>
    </ErrorBoundary>
  );
}

export default connect(null, { loaduser, connectSocketIo })(App);
