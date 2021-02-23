import React, { useEffect } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';


import LogInForm from './component/auth/LogInForm/LogInForm';
import Error404 from './screens/Error404Screen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';

function App() {

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => <LoginScreen />
        } />
        <Route exact path="/accounts/signup" render={() => <SignUpScreen />} />
        <Route component={Error404} />
      </Switch>


    </div>
  );
}

export default App;
