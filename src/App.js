import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Home} from './pages/Home';
import {Login} from './pages/Login';
import {Registration} from './pages/Registration';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="container pt-4">
          <Switch>
            <Route path='/login' exact component={Login}/>
            <Route path='/registration' component={Registration}/>
            <Route path='/' exact component={Home}/>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
