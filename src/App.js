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
    trainings: [],
    loggedInUser: null
  }
    
   componentDidMount() {
      axios.get(`${API_URL}/games`, {withCredentials: true})
      .then((res) => {
          this.setState({
    
            games: res.data
          })
      })
      axios.get(`${API_URL}/trainings`, {withCredentials: true})
      .then((response) => {
          this.setState({
            trainings: response.data
          })
      })
      if (!this.state.loggedInUser){
        axios.get(`${API_URL}/user`, {withCredentials: true})
        .then((result) => {
            this.setState({
              loggedInUser: result.data
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
    axios.get(`${API_URL}/logout`, {withCredentials: true})
      .then(() => {
        this.setState({
          loggedInUser: null
        }, ()=>{
          this.props.history.push('/login')
        })
      })
  }

  handleGameSubmit = (e, game) => {
    e.preventDefault()
    const {category, name, description, purpose, credit, video} = game
  
    axios.post(`${API_URL}/games/create`, {
      category: category,
      name: name,
      description: description, 
      purpose: purpose,
      credit: credit,
      video: video
      })
        .then((res) => {
          //redirect
          let newGame = res.data
          console.log(res.data)
          let cloneGames = JSON.parse(JSON.stringify(this.state.games))
          cloneGames.unshift(newGame)
          this.setState({
            games: cloneGames
          }, () => {
            this.props.history.push('/games')
          })
          
        })
  }
  
  handleTrainingSubmit = (e, training) => {
    e.preventDefault()
    const {name, description, duration, notes} = training
  
    axios.post(`${API_URL}/trainings/create`, {
      name: name,
      description: description, 
      duration: duration,
      notes: notes,
      })
        .then((res) => {
          //redirect
          let newTraining = res.data
          let cloneTrainings = JSON.parse(JSON.stringify(this.state.trainings))
          cloneTrainings.unshift(newTraining)
          this.setState({
            trainings: cloneTrainings
          }, () => {
            this.props.history.push('/trainings')
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
           <Route exact path="/games/create" render={(routeProps) => {
            return <GameCreate loggedInUser={this.state.loggedInUser} onSubmit={this.handleGameSubmit} {...routeProps}/>
          }} />
          <Route exact path="/games/:id" render={(routeProps) => {
            return <GameDetails loggedInUser={this.state.loggedInUser} {...routeProps}/>
          }} />
          <Route path="/games/:id/edit" render={() => {
            return <GameEdit loggedInUser={this.state.loggedInUser}/>
          }} />
          <Route exact path="/trainings" render={() => {
            return <TrainingsList loggedInUser={this.state.loggedInUser}/>
          }} />
          <Route path="/trainings/create" render={(routeProps) => {
            return <TrainingCreate loggedInUser={this.state.loggedInUser} onSubmit={this.handleTrainingSubmit} {...routeProps}/>
          }} />
          <Route exact path="/trainings/:id" render={(routeProps) => {
            return <TrainingDetails loggedInUser={this.state.loggedInUser} {...routeProps}/>
          }} />
          <Route  path="/trainings/:id/edit" render={() => {
            return <TrainingEdit loggedInUser={this.state.loggedInUser}/>
          }} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App)
