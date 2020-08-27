import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import NavBar from './components/NavBar'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'
import GamesList from './components/GamesList'
import GameCreate from './components/GameCreate'
import GameDetails from './components/GameDetails'
import GameEdit from './components/GameEdit'
import TrainingCreate from './components/TrainingCreate'
import TrainingsList from './components/TrainingsList'
import TrainingDetails from './components/TrainingDetails'
import TrainingEdit from './components/TrainingEdit'

import {Switch, Route} from 'react-router-dom'

class App extends React.Component {

  render(){
    return (
      <div >
        <NavBar/>
        <Switch>
          <Route exact path="/" render={() => {
            return <LoginPage/>
          }} />
          <Route path="/login" render={() => {
            return <LoginPage/>
          }} />
          <Route path="/signup" render={() => {
            return <SignupPage/>
          }} />
          <Route exact path="/games" render={() => {
            return <GamesList/>
          }} />
          <Route exact path="/games/:id" render={() => {
            return <GameDetails/>
          }} />
          <Route path="/games/:id/edit" render={() => {
            return <GameEdit/>
          }} />
          <Route path="/games/create" render={() => {
            return <GameCreate/>
          }} />
          <Route exact path="/trainings" render={() => {
            return <TrainingsList/>
          }} />
          <Route exact path="/trainings/:id" render={() => {
            return <TrainingDetails/>
          }} />
          <Route  path="/trainings/:id/edit" render={() => {
            return <TrainingEdit/>
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
