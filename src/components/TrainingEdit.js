import React, { Component } from 'react'
import axios from 'axios'
import {API_URL} from '../config'
import {Button} from 'react-bootstrap'


export default class TrainingEdit extends Component {

    state = {
        training: ''
    }

    componentDidMount() {
      let id = this.props.match.params.id
      axios.get(`${API_URL}/trainings/${id}`, {withCredentials: true})
        .then((res) => {
          this.setState({
            training: res.data
          })
        })
    }

    handleNameChange = (e) => {
      e.preventDefault();
      let updatedTraining = JSON.parse(JSON.stringify(this.state.training))
      updatedTraining.name = e.currentTarget.value //updating name
      this.setState({
        training: updatedTraining
      })
    }

    handleDescChange = (e) => {
      e.preventDefault();
        let updatedTraining = JSON.parse(JSON.stringify(this.state.training))
        updatedTraining.description = e.currentTarget.value //updating description
        this.setState({
            training: updatedTraining
        })
    }

    handleDurationChange = (e) => {
      e.preventDefault();
      let updatedTraining = JSON.parse(JSON.stringify(this.state.training))
      updatedTraining.duration = e.currentTarget.value //updating description
      this.setState({
          training: updatedTraining
      })
    }

    handleNotesChange = (e) => {
      e.preventDefault();
      let updatedTraining = JSON.parse(JSON.stringify(this.state.training))
      updatedTraining.notes = e.currentTarget.value //updating description
      this.setState({
          training: updatedTraining
      })
  }

    render() {
      const {name, duration, description, notes} = this.state.training
      return (
        <div className='form-page'>
          <form>
          <h1>Change that training!</h1>
           <div className='form-field'> 
            <p>New name?</p>
            <input onChange={this.handleNameChange} name="name" type="text" placeholder="Enter Name" value={name}></input>
          </div>

          <div className='form-field'>
            <p>What's the description?</p>
            <textarea onChange={this.handleDescChange} name="description" type="text" value={description} placeholder="Enter Description"></textarea>
          </div>

          <div className='form-field'>
            <p>How long it this training?</p>
            <input onChange={this.handleDurationChange} name="duration" type="text" value={duration} placeholder="Enter duration"></input>
          </div>

          <div className='form-field'>
            <p>Add some notes</p>
            <textarea onChange={this.handleNotesChange} name="notes" type="text" value={notes} placeholder="Enter notes"></textarea>
          </div>

            <Button onClick={() => this.props.onTrainingEdit(this.state.training)} variant="btn btn-success btn-create"  type="submit">Edit</Button>
          </form>
          <div className='form-image'>
            <img  src={require("../images/festive-pineapple.png")} alt='festive pineapple'/>
          </div>
        </div>
        )
    }
}