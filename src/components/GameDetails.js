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

    if (!this.state.game) {
      return <p>Loading .. </p>
    }

    return (
      <div className='form-page' >
      {
        !this.props.loggedInUser ? <p>Sign in <Link to="/login">here</Link></p> : 
        <div className='form-field'>
        <h1>{name}</h1>

        {
        this.props.loggedInUser._id !== creator ? null : 
        <>
        <Link to={`/games/${_id}/edit`}>
          <Button variant="btn btn-success">Edit</Button>
        </Link>
        <Button onClick={() => this.props.onGameDelete(_id)}  variant="btn btn-success">Delete</Button>
        </>
      }

        <div className='details-field'>
          <hr/>
          <h4>Type</h4>
          <p>{category.charAt(0).toUpperCase() + category.slice(1)}</p>
        </div>

        <div className='details-field'>
          <hr/>
          <h4>Description</h4>
          <p>{description}</p>
        </div>

        {
          !purpose ? null :
          <div className='details-field'>
            <hr/>
            <h4>Purpose</h4>
            <p>{purpose}</p>
          </div>
        }
        
        {
          !credit ? null :
          <div className='details-field'>
            <hr/>
            <h4>Credits</h4>
            <p>{credit}</p>
          </div>
        }

        {
          !video ? null :
          <ReactPlayer url={video}/>
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