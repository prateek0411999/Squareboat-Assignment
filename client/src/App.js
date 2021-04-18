import logo from './logo.svg';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home/home';
import CreateJob from './components/CreateJob/createJob';

import './App.css';
function App() {


  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/createJob" component={CreateJob} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
