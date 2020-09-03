import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
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
import NotFound from './components/404'

import {Switch, Route, withRouter} from 'react-router-dom'

class App extends React.Component {

  state = {
    games: [],
    trainings: [],
    loggedInUser: null,
    signUpError: null,
    logInError: null,
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
      .catch((err) => {
        this.setState({
          signUpError: err.response.data.errorMessage
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
      .catch((err) => {
        this.setState({
          logInError: err.response.data.errorMessage
        })
      }) 
  }

  handleLogOut = (e) => {
    e.preventDefault();
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
      }, {withCredentials: true})
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
      }, {withCredentials: true})
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

  handleGameDelete = (e, id) => {
    e.preventDefault();
    axios.delete(`${API_URL}/games/${id}`, {withCredentials: true})
      .then(() => {
          
        let filteredGames = this.state.games.filter((game) => {
          return game._id !== id
        })

        this.setState({
          games: filteredGames
        }, () => {
          this.props.history.push('/games')
        })

      })
  }

  handleTrainingDelete = (e, id) => {
    e.preventDefault();
    axios.delete(`${API_URL}/trainings/${id}`, {withCredentials: true})
      .then(() => {
          
        let filteredTrainings = this.state.trainings.filter((training) => {
          return training._id !== id
        })

        this.setState({
          trainings: filteredTrainings
        }, () => {
          this.props.history.push('/trainings')
        })

      })
  }

  handleGameEdit = (e, updatedGame) => {
    e.preventDefault();
    axios.patch(`${API_URL}/games/${updatedGame._id}`, {
      category: updatedGame.category,
      name: updatedGame.name,
      description: updatedGame.description, 
      purpose: updatedGame.purpose,
      credit: updatedGame.credit,
      video: updatedGame.video
    },  {withCredentials: true})
    .then(() => {
        //Use a map to always return a new array. ForEach does not
        // Please note that down. 
        let cloneGames = this.state.games.map((game) => {
            if (game._id === updatedGame._id) {
              game = updatedGame 
            }
            return game
        })
        this.setState({
          games: cloneGames
        }, () => {
          this.props.history.push('/games')
        })
    })
  }

  handleTrainingEdit = (e, updatedTraining) => {
    e.preventDefault();
    axios.patch(`${API_URL}/trainings/${updatedTraining._id}`, {
      name: updatedTraining.name,
      description: updatedTraining.description, 
      duration: updatedTraining.duration,
      notes: updatedTraining.notes,
    },  {withCredentials: true})
    .then(() => {

        let cloneTrainings = this.state.trainings.map((training) => {
            if (training._id === updatedTraining._id) {
              training = updatedTraining 
            }
            return training
        })
        this.setState({
          trainings: cloneTrainings
        }, () => {
          this.props.history.push('/trainings')
        })
    })
  }

  
  render(){
    return (
      <div className="body">
        {
          this.props.location.pathname === '/games' || 
          this.props.location.pathname === '/games/create' || 
          this.props.location.pathname === '/games/:id' ||
          this.props.location.pathname === '/games/:id/edit' ||
          this.props.location.pathname === '/trainings' ||
          this.props.location.pathname === '/trainings/create' ||
          this.props.location.pathname === '/trainings/:id' ||
          this.props.location.pathname === '/trainings/:id/edit' ? (
        <>
          <NavBar loggedInUser={this.state.loggedInUser} onLogout={this.handleLogOut}/>
          <img className='header-image' src={require("./images/header-image.jpg")} alt='row of pineapples'/>
        </>) : null
        }
        <Switch>
          <Route exact path="/" render={(routeProps) => {
            return <LoginPage {...routeProps}/>
          }} />
          <Route path="/login" render={(routeProps) => {
            return <LoginPage onSignIn={this.handleSignIn} errorMessage={this.state.logInError} {...routeProps}/>
          }} />
          <Route path="/signup" render={(routeProps) => {
            return <SignupPage onSignUp={this.handleSignUp} errorMessage={this.state.signUpError} {...routeProps}/>
          }} />
          <Route exact path="/games" render={(routeProps) => {
            return <GamesList loggedInUser={this.state.loggedInUser} {...routeProps}/>
          }} />
           <Route exact path="/games/create" render={(routeProps) => {
            return <GameCreate loggedInUser={this.state.loggedInUser} onSubmit={this.handleGameSubmit} {...routeProps}/>
          }} />
          <Route exact path="/games/:id" render={(routeProps) => {
            return <GameDetails loggedInUser={this.state.loggedInUser} onGameDelete={this.handleGameDelete} {...routeProps}/>
          }} />
          <Route path="/games/:id/edit" render={(routeProps) => {
            return <GameEdit onGameEdit={this.handleGameEdit} loggedInUser={this.state.loggedInUser} {...routeProps}/>
          }} />
          <Route exact path="/trainings" render={(routeProps) => {
            return <TrainingsList loggedInUser={this.state.loggedInUser} {...routeProps}/>
          }} />
          <Route path="/trainings/create" render={(routeProps) => {
            return <TrainingCreate loggedInUser={this.state.loggedInUser} onSubmit={this.handleTrainingSubmit} {...routeProps}/>
          }} />
          <Route exact path="/trainings/:id" render={(routeProps) => {
            return <TrainingDetails loggedInUser={this.state.loggedInUser} onTrainingDelete={this.handleTrainingDelete} {...routeProps}/>
          }} />
          <Route  path="/trainings/:id/edit" render={(routeProps) => {
            return <TrainingEdit onTrainingEdit={this.handleTrainingEdit} loggedInUser={this.state.loggedInUser} {...routeProps}/>
          }} />
          <Route component={NotFound} />
        </Switch>
        {this.props.children}
      </div>
    );
  }
}

export default withRouter(App)
