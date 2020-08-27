import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import {API_URL} from './config'
import axios from 'axios'
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

import {Switch, Route, withRouter} from 'react-router-dom'

class App extends React.Component {

  state = {
    games: [],
    loggedInUser: null
  }
    
   componentDidMount() {
      axios.get(`${API_URL}/games`)
      .then((res) => {
          this.setState({
    
            games: res.data
          })
      })
      if (!this.state.loggedInUser){
        axios.get(`${API_URL}/user`, {withCredentials: true})
        .then((res) => {
            this.setState({
              loggedInUser: res.data
            })
        })
      }  
  }

  handleSignUp = (e) => {
    e.preventDefault();
    const {username, email, password} = e.currentTarget;
  
    axios.post(`${API_URL}/signup`, {
      username: username.value,
      email: email.value, 
      password: password.value
    },  {withCredentials: true})
      .then((res) => {
        this.setState({
          loggedInUser: res.data
        } ,() => {
          this.props.history.push('/games')
        })
      })  
  }

  handleSignIn = (e) => {
    e.preventDefault();
    const {email, password} = e.currentTarget;
  
    axios.post(`${API_URL}/login`, {
      email: email.value, 
      password: password.value
    },{withCredentials: true})
      .then((res) => {
        this.setState({
          loggedInUser: res.data
        }, () => {
          this.props.history.push('/games')
        })
      })  
  }

  handleLogOut = (e) => {
    axios.post(`${API_URL}/logout`, {}, {withCredentials: true})
      .then(() => {
        this.setState({
          loggedInUser: null
        }, ()=>{
          this.props.history.push('/login')
        })
      })
  }

  handleGameSubmit = (e) => {
    e.preventDefault()
    const {category, name, description, purpose, credit, video} = e.currentTarget
  
    axios.post(`${API_URL}/create`, {
      category: category.value,
      name: name.value,
      description: description.value, 
      purpose: purpose.value,
      credit: credit.value,
      video: video.value
      })
        .then((res) => {
          //redirect
          let newGame = res.data
          let cloneGames = JSON.parse(JSON.stringify(this.state.games))
          cloneGames.unshift(newGame)
          this.setState({
            games: cloneGames
          }, () => {
            this.props.history.push('/games')
          })
          
        })
  }
  


  render(){
    return (
      <div >
        <NavBar loggedInUser={this.state.loggedInUser} onLogout={this.handleLogOut}/>
        <Switch>
          <Route exact path="/" render={() => {
            return <LoginPage/>
          }} />
          <Route path="/login" render={(routeProps) => {
            return <LoginPage onSignIn={this.handleSignIn} {...routeProps}/>
          }} />
          <Route path="/signup" render={(routeProps) => {
            return <SignupPage onSignUp={this.handleSignUp} {...routeProps}/>
          }} />
          <Route exact path="/games" render={() => {
            return <GamesList loggedInUser={this.state.loggedInUser}/>
          }} />
          <Route exact path="/games/:id" render={() => {
            return <GameDetails loggedInUser={this.state.loggedInUser}/>
          }} />
          <Route path="/games/:id/edit" render={() => {
            return <GameEdit loggedInUser={this.state.loggedInUser}/>
          }} />
          <Route exact path="/games/create" render={(routeProps) => {
            return <GameCreate loggedInUser={this.state.loggedInUser} onSubmit={this.handleGameSubmit} {...routeProps}/>
          }} />
          <Route exact path="/trainings" render={() => {
            return <TrainingsList loggedInUser={this.state.loggedInUser}/>
          }} />
          <Route exact path="/trainings/:id" render={() => {
            return <TrainingDetails loggedInUser={this.state.loggedInUser}/>
          }} />
          <Route  path="/trainings/:id/edit" render={() => {
            return <TrainingEdit loggedInUser={this.state.loggedInUser}/>
          }} />
          <Route path="/trainings/create" render={() => {
            return <TrainingCreate loggedInUser={this.state.loggedInUser}/>
          }} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App)
