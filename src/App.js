import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Boards from './pages/Boards';
import Login from './pages/Login';
import Registration from './pages/Registration';
import BoardPage from './pages/BoardPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path='/login' exact component={Login}/>
          <Route path='/registration' component={Registration}/>
          <Route path='/:token' exact component={Home}/>
          <Route path='/:token/boards' component={Boards}/>
          <Route path='/:token/b/:id' component={BoardPage}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
