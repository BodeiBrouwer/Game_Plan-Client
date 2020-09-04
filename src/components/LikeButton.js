import React, { Component } from 'react'
import axios from 'axios'
import {API_URL} from '../config'


export default class LikeButton extends Component {

  state = {
    game: '',
    likeList: []
  }

  componentDidMount() {
    this.setState({
      game: this.props.game,
      likeList: this.state.game.likes
    })
  }

  incrementMe = () => {
    axios.patch(`${API_URL}/games/${this.state.game._id}/like`, {}, {withCredentials: true})
    .then((game) => {
      this.setState({
        game: game.data,
      })
    })
  }

  render() {
    if (!this.state.game.likes) {
      return <p>Loading .. </p>
    }
    return(
      <div className='likes'>
      <p>{this.state.game.likes.length}</p>
        <button className='like-count' onClick={this.incrementMe}>
        {
          this.state.game.likes.includes(this.props.loggedInUser._id) ? 
          <img className='like-btn liked' src={require('../images/pineapple.png')} alt='pineapple'/> : 
          <img className='like-btn' src={require('../images/pineapple.png')} alt='pineapple'/>
        }
        </button>
      </div>
    )
  }
}