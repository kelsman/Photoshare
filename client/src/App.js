import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/auth/Login';



function App() {

  return (
    <div className="App">


      <Switch>
        <Route exact path="/" component={Login} />
      </Switch>


    </div>
  );
}

export default App;
