import React, { Component } from 'react'
import axios from 'axios'
import {API_URL} from '../config'


export default class LikeButton extends Component {

  state = {
    game: ''
  }

  componentDidMount() {
    let id = this.props.match.params.id
      axios.get(`${API_URL}/games/${id}/like`, {withCredentials: true})
        .then((game) => {
          console.log(game.data)
          this.setState({
            game: game.data,
          })
        })
  }

  incrementMe = (e) => {
    let updatedGame = JSON.parse(JSON.stringify(this.state.game))
    updatedGame.likes = e.currentTarget.value
    console.log(updatedGame.likes)
    this.setState({
        game: updatedGame
    })
  }

  render() {
    return(
      <>
        <button className='like-count' onClick={this.incrementMe}>
          <img className='like-btn' src={require('../images/pineapple.png')} alt='pineapple'/>
          <p>{this.state.likes}</p>
        </button>
      </>
    )
  }
}