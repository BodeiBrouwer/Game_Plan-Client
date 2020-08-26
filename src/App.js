import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import NavBar from './components/NavBar'
import GamesList from './components/GamesList'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import GameCreate from './components/GameCreate'
import TrainingCreate from './components/TrainingCreate'

import {Switch, Route} from 'react-router-dom'

class App extends React.Component {

  render(){
    return (
      <div >
        <NavBar/>
        <Switch>
          <Route exact path="/" render={() => {
            return <GamesList/>
          }} />
          <Route exact path="/games" render={() => {
            return <GamesList/>
          }} />
          <Route path="/login" render={() => {
            return <LoginPage/>
          }} />
          <Route path="/signup" render={() => {
            return <SignupPage/>
          }} />
          <Route path="/games/create" render={() => {
            return <GameCreate/>
          }} />
          <Route path="/trainings/create" render={() => {
            return <TrainingCreate/>
          }} />
        </Switch>
      </div>
    );
  }
}

export default App;
