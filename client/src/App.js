import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Level } from 'react-accessible-headings';
import NavBar from 'Components/NavBar/NavBar';
import Messages from 'Pages/Messages/Messages';
import './App.css';

function App() {
  return (
    <div className='App'>
      <NavBar />
      <Switch>
        <Level>
          <Route path='/messages' component={Messages} />
        </Level>
      </Switch>
    </div>
  );
}

export default App;
