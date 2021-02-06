import React from 'react';
import LogIn from './components/auth/Login/index';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux'
import MainPage from './pages/mainPage';

// import Pusher from 'pusher-js'


// import PostsPage from './pages/post';

class App extends React.Component {



  render() {

    return (
      <div className="App">

        <Switch>
          <Route exact path="/" component={LogIn} />
          <Route path="/userFeeds" render={() => <MainPage />} />

        </Switch>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated
  }
}
export default connect(mapStateToProps)(App);

