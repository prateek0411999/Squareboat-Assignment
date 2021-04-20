import logo from './logo.svg';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home/home';

import './App.css';
function App() {


  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
