import React from 'react'
import {Link} from 'react-router-dom'
import {Card, Button} from 'react-bootstrap'
import {API_URL} from '../config'
import axios from 'axios'
import LikeButton from './LikeButton'
import Select from 'react-select'
import Popup from './Popup'

const options = [
  {label: 'Warm-ups', value: 'warm-up'},
  {label: 'Exercises', value: 'exercise'},
  {label: 'Scenes', value: 'scenes'}
];

export default class GamesList extends React.Component {

  state = {
    games: [],
    selectedOption: null,
    filteredGames: [],
    showPopup: false
  }
    
  componentDidMount() {
    axios.get(`${API_URL}/games`, {withCredentials: true})
      .then((games) => {
        this.setState({
          games: games.data,
          filteredGames: games.data
        })
      })
  }

  handleSearch = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);

    let cloneFilter = []
    if (selectedOption) {
      let categories = selectedOption.map(option => option.value)
      console.log(categories)
      cloneFilter = this.state.games.filter((game) => {
        return categories.includes(game.category)
      })
    } 
    else {
      cloneFilter = this.state.games
    }
    this.setState({
      filteredGames: cloneFilter
    })
  };

  togglePopup() {  
    this.setState({  
         showPopup: !this.state.showPopup  
    });  
  }  

  render() {
    const { selectedOption } = this.state;
    return (
      <div>
      {
        !this.props.loggedInUser ? <p>Sign in <Link to="/login">here</Link></p> : 
        <div className='center-piece'>
        <h1> Search Our Game Database</h1>
        <section className='search-section'>
          <Select 
            className='select'
            isMulti
            value={selectedOption}
            onChange={this.handleSearch}
            options={options}/>
          <Link to={`/games/create`}>
            <Button variant="btn btn-success btn-new-game">Create your own game</Button>
          </Link>
        </section>
        {
          this.state.filteredGames.map((game, i) => {
            return (
            <Card className='card' key={"game"+i}>
              <Card.Header className='card-header'><span className='card-title'><h5>{game.name}</h5> <h5>{game.category.charAt(0).toUpperCase() + game.category.slice(1)}</h5></span></Card.Header>
              <Card.Body>
                <Card.Text className='card-game-descr overflow'>
                  {game.description}
                </Card.Text>
                <div className='btn-with-like'>
                  <div className='btn-collection-card'>
                    <Link to={`/games/${game._id}`}>
                      <Button variant="btn btn-success">More</Button>
                    </Link>
                    <Button className='btn-add' onClick={this.togglePopup.bind(this)} variant="btn btn-success">Add to training</Button>
                    {
                      this.state.showPopup ?  
                    <Popup show={this.state.showPopup} game={game} closePopup={this.togglePopup.bind(this)} />  
                    : null  
                    }  
                  </div>
                  <LikeButton className='like-btn' game={game}/>
                </div>
              </Card.Body>
            </Card>
            )
          })
        }
      </div>
      }
    </div>
    )
  }
}

