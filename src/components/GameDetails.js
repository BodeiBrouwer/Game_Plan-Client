import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import ReactPlayer from 'react-player/lazy'
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
    const {name, category, description, purpose, credit, video, _id, creator} = this.state.game

    return (
      <div>
      {
        !this.props.loggedInUser ? <p>Sign in <Link to="/login">here</Link></p> : 
        <div>
        <h1>{name}</h1>
        <p>{category}</p>
        <p>{description}</p>
        <p>{purpose}</p>
        <p>{credit}</p>
        <ReactPlayer url={video}/>

      {
        this.props.loggedInUser._id !== creator ? null : 
        <>
        <Link to={`/games/${_id}/edit`}>
          <Button variant="btn btn-success">Edit</Button>
        </Link>
        <Button onClick={() => this.props.onGameDelete(_id)}  variant="btn btn-success">Delete</Button>
        </>
      }
      </div>
      }
    </div>
    )
  }
}