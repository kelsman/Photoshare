import React from 'react';
import LogIn from './components/auth/Login/index';
import { Switch, Route } from 'react-router-dom';
import PostsPage from './pages/post';



function App() {

  return (
    <div className="App">

      <Switch>
        <Route exact path="/" component={LogIn} />
        <Route exact path='/user/feeds' component={PostsPage} />
      </Switch>





    </div>
  );
}

export default App;
