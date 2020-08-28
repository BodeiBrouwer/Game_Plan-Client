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
    const {name, duration, description, notes, _id} = this.state.training

    return (
      <div>
      {
        !this.props.loggedInUser ? <p>Sign in <Link to="/login">here</Link></p> : 
        <div>
          <h1> These are the details!</h1>
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
    }
    </div>
    )
  }
}