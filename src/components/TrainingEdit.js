import React, { Component } from 'react'
import axios from 'axios'
import {API_URL} from '../config'


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
      let updatedTraining = JSON.parse(JSON.stringify(this.state.training))
      updatedTraining.name = e.currentTarget.value //updating name
      this.setState({
        training: updatedTraining
      })
    }

    handleDescChange = (e) => {
        let updatedTraining = JSON.parse(JSON.stringify(this.state.training))
        updatedTraining.description = e.currentTarget.value //updating description
        this.setState({
            training: updatedTraining
        })
    }

    handleDurationChange = (e) => {
      let updatedTraining = JSON.parse(JSON.stringify(this.state.training))
      updatedTraining.duration = e.currentTarget.value //updating description
      this.setState({
          training: updatedTraining
      })
    }

    handleNotesChange = (e) => {
      let updatedTraining = JSON.parse(JSON.stringify(this.state.training))
      updatedTraining.notes = e.currentTarget.value //updating description
      this.setState({
          training: updatedTraining
      })
  }

    render() {
      const {name, duration, description, notes} = this.state.training
      return (
            <>
            <p>New name?</p>
            <input onChange={this.handleNameChange} name="name" type="text" placeholder="Enter Name" value={name}></input>

            <p>What's the description?</p>
            <input onChange={this.handleDescChange} name="description" type="text" value={description} placeholder="Enter Description"></input>

            <p>How long it this training?</p>
            <input onChange={this.handleDurationChange} name="duration" type="text" value={duration} placeholder="Enter duration"></input>

            <p>Add some notes</p>
            <input onChange={this.handleNotesChange} name="notes" type="text" value={notes} placeholder="Enter notes"></input>

            <button onClick={() => this.props.onTrainingEdit(this.state.training)} type="submit">Edit</button>
            </>
        )
    }
}