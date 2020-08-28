import React from 'react'
import {Link} from 'react-router-dom'

export default class GameCreate extends React.Component {
  state = {
    newgame: {}
  }

  handleChange = (event) => {
    let key = event.currentTarget.name
    let value = event.currentTarget.value
    const cloneGame = JSON.parse(JSON.stringify(this.state.newgame))
    cloneGame[key] = value

    this.setState({
      newgame: cloneGame
    })

  }


  render(){
    return (
      <div>
      {
        !this.props.loggedInUser ? <p>Sign in <Link to="/login">here</Link></p> : 
        <div>
        <h1>Create a new game</h1>
        <form onSubmit={(e)=> this.props.onSubmit(e, this.state.newgame)}>
          <fieldset>
            <p>What type of game is it?*</p>
            <div>
              <input onChange={this.handleChange} checked={this.state.newgame.category === "warm-up" ? true : false} type="checkbox" name="category" value="warm-up"></input>
              <label htmlFor="warm-up">Warm-up</label>
            </div>

            <div>
              <input onChange={this.handleChange} checked={this.state.newgame.category === "exercise" ? true : false} type="checkbox" name="category" value="exercise"></input>
              <label htmlFor="exercise">Exercise</label>
            </div>

            <div>
              <input onChange={this.handleChange} checked={this.state.newgame.category === "scenes" ? true : false} type="checkbox" name="category" value="scenes"></input>
              <label htmlFor="scenes">Scenes</label>
            </div>
          </fieldset>

          <div>
            <p>What is the name of the game?*</p>
            <input onChange={this.handleChange} name="name" type="text" placeholder="Name of the game"></input>
          </div>

          <div>
            <p>Give a description of the game*</p>
            <input onChange={this.handleChange} name="description" type="text" placeholder="Describe the game"></input>
          </div>

          <div>
            <p>What are the benefits of this game?</p>
            <input onChange={this.handleChange} name="purpose" type="text" placeholder="Enter purpose"></input>
          </div>

          <div>
            <p>Do you wanna credit someone for this game?</p>
            <input onChange={this.handleChange} name="credit" type="text" placeholder="Credit the mastermind"></input>
          </div>

          <div>
            <p>Feel free to add a link to a video that shows/explains this game</p>
            <input onChange={this.handleChange} name="video" type="text" placeholder="Video URL"></input>
          </div>

            <button type="submit">Create</button>
        </form>
      </div>
    }
    </div>
    )
  }
}
