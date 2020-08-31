import React from 'react'
import {Link} from 'react-router-dom'

export default class  TrainingCreate extends React.Component{

  state = {
    newtraining: {}
  }
  
  handleChange = (event) => {
    let key = event.currentTarget.name
    let value = event.currentTarget.value
    const cloneTraining = JSON.parse(JSON.stringify(this.state.newtraining))
    cloneTraining[key] = value

    this.setState({
      newtraining: cloneTraining
    })

  }

  render() {
    return (
      <div>
       {
        !this.props.loggedInUser ? <p>Sign in <Link to="/login">here</Link></p> : 
        <div>
      <h1>Create a new training</h1>
      <form onSubmit={(e)=> this.props.onSubmit(e, this.state.newtraining)}>
        <div>
          <p>What is the name of the training?*</p>
          <input onChange={this.handleChange} name="name" type="text" placeholder="Training name"></input>
        </div>

        <div>
          <p>Give a description of the training*</p>
          <input onChange={this.handleChange} name="description" type="text" placeholder="Description"></input>
        </div>

        <div>
          <p>What is the duration of the training in minutes?</p>
          <input onChange={this.handleChange} name="duration" type="number" placeholder="Enter time"></input>
        </div>

        <div>
          <p>Notes on this training</p>
          <input onChange={this.handleChange} name="notes" type="text" placeholder="What's on your mind?"></input>
        </div>

        <button type="submit">Create</button>
      </form>
      </div>
    }
    </div>
    )
  }
}