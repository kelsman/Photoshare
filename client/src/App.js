import React, { useEffect } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

// components
import Error404 from './screens/Error404Screen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/Home/HomeScreen';
import { useHistory } from 'react-router-dom';

// routes constants 
import * as Routes from './component/routes';

const token = localStorage.getItem('authToken')

function App() {

  return (

    <div className="App">
      <Switch>
        <Route exact path={Routes.Login} render={() => <LoginScreen />} />
        <Route exact path={Routes.SignUp} render={() => <SignUpScreen />} />
        <Route exact path={Routes.Dashboard} render={() => <HomeScreen />} />
        <Route component={Error404} />
      </Switch>


    </div>
  );
}

export default App;
