import React from 'react'
import {Link} from 'react-router-dom'
import {Card, Button} from 'react-bootstrap'
import {API_URL} from '../config'
import axios from 'axios'

export default class TrainingsList extends React.Component {

  state = {
    trainings: [],
    }

  componentDidMount() {
    axios.get(`${API_URL}/trainings`, {withCredentials: true})
      .then((trainings) => {
        this.setState({
          trainings: trainings.data,
        })
      }) 
  }
  
  render() {
    return (
      <div>
      {
        !this.props.loggedInUser ? <p>Sign in <Link to="/login">here</Link></p> : 
      <div> 
      <h1> My trainings</h1>
        {
          this.state.trainings.map((training, i) => {
            return(
            <Card key={"training"+i}>
              <Card.Header as="h5">{training.name}</Card.Header>
              <Card.Body>
                <Card.Text>
                  {training.description}
                </Card.Text>
                <Card.Text className="duration">
                  {training.duration} minutes
                </Card.Text>
                <Link to={`/trainings/${training._id}`}>
                  <Button variant="primary">More</Button>
                </Link>
              </Card.Body>
            </Card>
            )
          })
        }
        <Link to={`/trainings/create`}>
          <Button variant="primary">New training</Button>
        </Link>
      </div>
      }
    </div>
    )
  }
}
