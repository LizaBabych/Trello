import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Boards from './pages/Boards';
import Login from './pages/Login';
import Registration from './pages/Registration';
import BoardPage from './pages/BoardPage';

const App: React.FC = () =>{
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path='/login' exact component={Login}/>
          <Route path='/registration' component={Registration}/>
          <Route path='/' exact component={Home}/>
          <Route path='/boards' component={Boards}/>
          <Route path='/board/:id' component={BoardPage}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
