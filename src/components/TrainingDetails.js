import React from 'react'
import {Link} from 'react-router-dom'
import {Button, Card} from 'react-bootstrap'
import axios from 'axios'
import {API_URL} from '../config'

export default class TrainingDetails extends React.Component {

  state = {
    training: [],
    selectedGame: null,
    }

  componentDidMount() {
    let id = this.props.match.params.id
      axios.get(`${API_URL}/trainings/${id}`, {withCredentials: true})
      .then((training) => {
        this.setState({
        training: training.data,
        })
      })
    }

    handleDelete = (e, game) => {
      e.preventDefault();
      axios.patch(`${API_URL}/games/${this.state.training._id}/${game._id}/delete`, {}, {withCredentials: true})
      .then((game) => {
        this.setState({
          selectedGame: game.data,
        }, () => {
          this.props.history.push(`/trainings/${this.state.training._id}`)
        })
      })
    }
  
  render() {
    if (!this.state.training) {
      return <p>Loading .. </p>
    }

    const {name, duration, description, notes, _id, games} = this.state.training

    return (
      <div className='form-page' >
      {
        !this.props.loggedInUser ? <p>Sign in <Link to="/login">here</Link></p> : 
        <div className='form-field'>
        <h1>{name}</h1>
        <div className='btn-collection-card'>
          <Link to={`/trainings/${_id}/edit`}>
            <Button variant="btn btn-success">Edit</Button>
          </Link>
          <Button onClick={() => this.props.onTrainingDelete(_id)} variant="btn btn-success">Delete</Button>
        </div>
        <hr/>
        <h5>{duration} min</h5>

        <div className='details-field'>
          <hr/>
          <h4>Description</h4>
          <p>{description}</p>
        </div>


        {
          !notes ? null :
          <div className='details-field'>
            <hr/>
            <h4>Notes</h4>
            <p>{notes}</p>
          </div>
        }

        
        {
          !games ? (<p>Loading ... </p>) : 
          games.length === 0 ? null :
          <>
            <hr/>
            <h4>Games</h4>
          {
          games.map((game, i) => {
            return (
            <>
            <Card key={"mygame"+i}>
              <Card.Header className='card-header'><span className='card-title'><h5>{game.name}</h5> <h5>{game.category.charAt(0).toUpperCase() + game.category.slice(1)}</h5></span></Card.Header>
              <Card.Body>
                <Card.Text className='card-game-descr overflow'>
                  {game.description}
                </Card.Text>
                <Link to={`/games/${game._id}`}>
                  <Button variant="btn btn-success">More</Button>
                </Link>
                  <Button onClick={() => this.handleDelete(game)} variant="btn btn-success">Remove from training</Button>
              </Card.Body>
            </Card>
            </>
            )
          })
          }
          </>
        }
      </div>
    }
      <div className='form-image'>
        <img  src={require("../images/pineapple-pink-glasses.png")} alt='festive pineapple'/>
      </div>
    </div>
    )
  }
}