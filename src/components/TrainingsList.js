import React from 'react'
import {Link} from 'react-router-dom'
import {Card, Button} from 'react-bootstrap'

export default class TrainingsList extends React.Component {

  state = {
    trainings: [
      {
      name: 'Stuurlui',
      description: 'Finding the game',
      duration: 120,
      notes: 'It went very well'
      },
      {
      name: 'Ha-BB',
      description: 'Two person scenes',
      duration: 90,
      notes: 'We got good feedback'
      }
    ]
    }
  
  render() {
    return (
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
    )
  }
}
