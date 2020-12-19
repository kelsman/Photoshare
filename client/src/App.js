
import './App.css';
import Landing from './pages/Landing';
import { Switch, Route } from 'react-router-dom'
import SignUp from './components/auth/signup/signup';
import MainPage from './pages/MainPage';

function App() {
  return (
    <div className="App">

      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path="/user/dashboard" component={MainPage} />
      </Switch>


    </div>
  );
}

export default App;
