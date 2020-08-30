import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import axios from 'axios'
import {API_URL} from '../config'

export default class GameDetails extends React.Component {

  state = {
    game: {},
    }

  componentDidMount() {
    let id = this.props.match.params.id
        axios.get(`${API_URL}/games/${id}`, {withCredentials: true})
            .then((game) => {
                this.setState({
                  game: game.data,
                })
            })
  }

  render() {
    const {name, category, description, purpose, credit, video, _id} = this.state.game

    return (
      <div>
      {
        !this.props.loggedInUser ? <p>Sign in <Link to="/login">here</Link></p> : 
        <div>
         <h1>These are game details</h1>
        <h1>{name}</h1>
        <p>{category}</p>
        <p>{description}</p>
        <p>{purpose}</p>
        <p>{credit}</p>
        <iframe width="560" height="315" src={video} frameBorder="0" allow="encrypted-media" allowFullScreen title={name}></iframe>

      
       <Link to={`/games/${_id}/edit`}>
        <Button variant="primary">Edit</Button>
       </Link>
          <Button onClick={() => this.props.onGameDelete(_id)}  variant="primary">Delete</Button>
      </div>
      }
    </div>
    )
  }
}