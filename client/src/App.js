import React, { useEffect } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';


import LogInForm from './component/auth/LogInForm/LogInForm';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';

function App() {

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => <LoginScreen />
        } />
        <Route exact path="/accounts/signup" render={() => <SignUpScreen />} />
      </Switch>

    </div>
  );
}

export default App;
