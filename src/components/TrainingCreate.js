import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'

export default class  TrainingCreate extends React.Component{

  state = {
    newtraining: {}
  }
  
  handleChange = (event) => {
    event.preventDefault();
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
      <div className='form-page'>
       {
        !this.props.loggedInUser ? <p>Sign in <Link to="/login">here</Link></p> : 
        <div>
      <form onSubmit={(e)=> this.props.onSubmit(e, this.state.newtraining)}>
      <h1>Create a new training</h1>
        <div className='form-field'>
          <p>What is the name of the training?*</p>
          <input onChange={this.handleChange} name="name" type="text" placeholder="Training name"></input>
        </div>

        <div className='form-field'>
          <p>Give a description of the training*</p>
          <textarea onChange={this.handleChange} name="description" type="text" placeholder="Description"></textarea>
        </div>

        <div className='form-field'>
          <p>What is the duration of the training in minutes?</p>
          <input onChange={this.handleChange} name="duration" type="number" placeholder="Enter time"></input>
        </div>

        <div className='form-field'>
          <p>Notes on this training</p>
          <textarea onChange={this.handleChange} name="notes" type="text" placeholder="What's on your mind?"></textarea>
        </div>

        <Button variant="btn btn-success btn-create" type="submit">Create</Button>
      </form>
      <div className='form-image'>
          <img  src={require("../images/festive-pineapple.png")} alt='festive pineapple'/>
        </div>
      </div>
    }
    </div>
    )
  }
}