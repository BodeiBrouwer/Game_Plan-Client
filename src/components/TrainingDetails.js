import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import axios from 'axios'
import {API_URL} from '../config'

export default class TrainingDetails extends React.Component {

  state = {
    training: [],
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
  
  render() {
    const {name, duration, description, notes, _id, games} = this.state.training

    return (
      <div>
      {
        !this.props.loggedInUser ? <p>Sign in <Link to="/login">here</Link></p> : 
        <div>
        <h1>{name}</h1>
        <p>Duration: {duration}</p>
        <h4>Description</h4>
        <p>{description}</p>
        <h4>Notes</h4>
        <p>{notes}</p>
        <h4>Games</h4>
        <p>{games}</p>

        {/* {
          games.map((game, i) => {
            return (
            <Card key={"mygame"+i}>
              <Card.Header as="h5">{game.category.charAt(0).toUpperCase() + game.category.slice(1)}</Card.Header>
              <Card.Body>
                <Card.Title>{game.name}</Card.Title>
                <Card.Text>
                  {game.description}
                </Card.Text>
                <Link to={`/games/${game._id}`}>
                  <Button variant="primary">More</Button>
                </Link>
              </Card.Body>
            </Card>
            )
          })
        } */}

      
       <Link to={`/trainings/${_id}/edit`}>
        <Button variant="primary">Edit</Button>
       </Link>
          <Button onClick={() => this.props.onTrainingDelete(_id)} variant="primary">Delete</Button>
      </div>
    }
    </div>
    )
  }
}