import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'

export default class GameDetails extends React.Component {

  state = {
    game: []
    }

  render() {
    const {name, category, description, purpose, credit, video, _id} = this.state.training

    return (
      <div>
        <h1>{name}</h1>
        <p>{category}</p>
        <p>{description}</p>
        <p>{purpose}</p>
        <p>{credit}</p>
        <iframe width="560" height="315" src={video} frameborder="0" allow="encrypted-media" allowfullscreen title={name}></iframe>

      
       <Link to={`/games/${_id}/edit`}>
        <Button variant="primary">Edit</Button>
       </Link>
        <Link to={`/games/${_id}/delete`}>
          <Button variant="primary">Delete</Button>
        </Link>
      </div>
    )
  }
}