import React, { Component } from 'react'
import axios from 'axios'
import {API_URL} from '../config'
import {Button} from 'react-bootstrap'


export default class GameEdit extends Component {

  state = {
    game: ''
  }

  componentDidMount() {
    let id = this.props.match.params.id
      axios.get(`${API_URL}/games/${id}`, {withCredentials: true})
        .then((game) => {
          console.log(game.data)
          this.setState({
            game: game.data,
          })
        })
  }

  handleCatChange = (event) => {
      let key = event.currentTarget.name
      let value = event.currentTarget.value
      const cloneGame = JSON.parse(JSON.stringify(this.state.game))
      cloneGame[key] = value
  
      this.setState({
        game: cloneGame
      })
  }

    handleNameChange = (e) => {
        let updatedGame = JSON.parse(JSON.stringify(this.state.game))
        updatedGame.name = e.currentTarget.value //updating name
        this.setState({
            game: updatedGame
        })
    }

    handleDescChange = (e) => {
        let updatedGame = JSON.parse(JSON.stringify(this.state.game))
        updatedGame.description = e.currentTarget.value //updating description
        this.setState({
            game: updatedGame
        })
    }

    handlePurposeChange = (e) => {
      let updatedGame = JSON.parse(JSON.stringify(this.state.game))
      updatedGame.purpose = e.currentTarget.value //updating description
      this.setState({
          game: updatedGame
      })
    }

    handleCreditChange = (e) => {
      let updatedGame = JSON.parse(JSON.stringify(this.state.game))
      updatedGame.credit = e.currentTarget.value //updating description
      this.setState({
          game: updatedGame
      })
    }

    handleVideoChange = (e) => {
      let updatedGame = JSON.parse(JSON.stringify(this.state.game))
      updatedGame.video = e.currentTarget.value //updating description
      this.setState({
          game: updatedGame
      })
    }


    render() {
        const {name, description, purpose, credit, video} = this.state.game
        return (
          <div className='form-page'>
            <form>
            <h1>Game changer</h1>
              <fieldset>
                <div>
                <p>What type of game is it?</p>
                  <input onChange={this.handleCatChange} checked={this.state.game.category === "warm-up" ? true : false} type="checkbox" name="category" value="warm-up"></input>
                  <label htmlFor="warm-up">Warm-up</label>
                </div>

                <div>
                  <input onChange={this.handleCatChange} checked={this.state.game.category === "exercise" ? true : false} type="checkbox" name="category" value="exercise"></input>
                  <label htmlFor="exercise">Exercise</label>
                </div>

                <div>
                  <input onChange={this.handleCatChange} checked={this.state.game.category === "scenes" ? true : false} type="checkbox" name="category" value="scenes"></input>
                  <label htmlFor="scenes">Scenes</label>
                </div>
              </fieldset>

              <div className='form-field'>
                <p>We do need a name</p>
                <input onChange={this.handleNameChange} name="name" type="text" placeholder="Enter Name" value={name}></input>
              </div>

              <div className='form-field'>
                <p>Give a clear description</p>
                <input onChange={this.handleDescChange} name="description" type="text" value={description} placeholder="Enter Description"></input>
              </div>

              <div className='form-field'>
                <p>But what can we learn from it?</p>
                <input onChange={this.handlePurposeChange} name="name" type="text" placeholder="Enter purpose" value={purpose}></input>
              </div>

              <div className='form-field'>
                <p>Anyone to credit?</p>
                <input onChange={this.handleCreditChange} name="name" type="text" placeholder="Enter credit" value={credit}></input>
              </div>

              <div className='form-field'>
                <p>Wanna change the video?</p>
                <input onChange={this.handleVideoChange} name="name" type="text" placeholder="Enter video url" value={video}></input>
              </div>

              <Button onClick={() => this.props.onGameEdit(this.state.game)} variant="btn btn-success btn-create" type="submit">Edit</Button>
          </form>
          <div className='form-image'>
            <img  src={require("../images/festive-pineapple.png")} alt='festive pineapple'/>
          </div>
        </div>
        )
    }
}