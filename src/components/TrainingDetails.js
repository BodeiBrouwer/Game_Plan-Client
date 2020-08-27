import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'

export default class TrainingDetails extends React.Component {

  state = {
    training: []
    }
  
  render() {
    const {name, duration, description, notes, _id} = this.state.training

    return (
      <div>
        <h1>{name}</h1>
        <p>{duration}</p>
        <p>{description}</p>
        <p>{notes}</p>
      
       <Link to={`/trainings/${_id}/edit`}>
        <Button variant="primary">Edit</Button>
       </Link>
        <Link to={`/trainings/${_id}/delete`}>
          <Button variant="primary">Delete</Button>
        </Link>
      </div>
    )
  }
}