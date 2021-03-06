import React from 'react'
import {API_URL} from '../config'
import axios from 'axios'
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default class Popup extends React.Component {

  state = {
    trainings: [],
    selectedTrainings: []
    }

  componentDidMount() {
    axios.get(`${API_URL}/trainings`, {withCredentials: true})
      .then((trainings) => {
        this.setState({
          trainings: trainings.data,
        })
      }) 
  }

  handleChange = (event) => {
    let value = event.currentTarget.value
    let cloneTraining = JSON.parse(JSON.stringify(this.state.selectedTrainings))
    cloneTraining = value
    this.setState({
      selectedTrainings: cloneTraining
    })
  }

  handleAdd = (game) => {
    axios.patch(`${API_URL}/games/${this.state.selectedTrainings}/${game._id}/add`, {}, {withCredentials: true})
    .then((training) => {
      this.setState({
        selectedTrainings: training.data,
      })
    })
  }
  
  render() {
    return (
      <div className='popup'>
      {
      <div className='popup\_inner'> 
      <fieldset>
        <h2>Your trainings</h2>
        <hr/>
        <div classname='popup-list'>
        {
          this.state.trainings.map((training, i) => {
            return(
              <div className='popup-item' key={"check"+ training._id}>
              <input className='popup-input' onChange={this.handleChange} checked={this.state.selectedTrainings === training._id ? true : false} type="checkbox" name={training._id} value={training._id}></input>
              <label htmlFor={training._id}>{training.name}</label>
            </div>
            )
          })
        }  
        </div> 
      </fieldset>
        
        <Link to={`/games`}>
          <Button onClick={() => {this.handleAdd(this.props.game); this.props.closePopup();}} variant="btn btn-success">Add</Button>
        </Link>
        <Link to={`/trainings/create`}>
          <Button variant="btn btn-success">New training</Button>
        </Link>
      </div>
      }
    </div>
    )
  }
}
