
import './App.css';
import Landing from './pages/Landing';
import { Switch, Route } from 'react-router-dom'
import SignUp from './components/auth/signup/signup';
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route exact path='/signup' component={SignUp} />
      </Switch>

    </div>
  );
}

export default App;
