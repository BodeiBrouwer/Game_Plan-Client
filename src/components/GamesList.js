import React from 'react'
import {Link} from 'react-router-dom'
import {Card, Button} from 'react-bootstrap'
import {API_URL} from '../config'
import axios from 'axios'
import LikeButton from './LikeButton'
import Select from 'react-select'

const options = [
  {label: 'Warm-ups', value: 'warm-up'},
  {label: 'Exercises', value: 'exercise'},
  {label: 'Scenes', value: 'scenes'}
];

export default class GamesList extends React.Component {

  state = {
    games: [],
    selectedOption: null,
    filteredGames: []
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

  render() {
    const { selectedOption } = this.state;
    return (
      <div>
      {
        !this.props.loggedInUser ? <p>Sign in <Link to="/login">here</Link></p> : 
        <div>
        <Select
          isMulti
          value={selectedOption}
          onChange={this.handleSearch}
          options={options}/>
        {
          this.state.filteredGames.map((game, i) => {
            return (
            <Card key={"game"+i}>
              <Card.Header as="h5">{game.category.charAt(0).toUpperCase() + game.category.slice(1)}</Card.Header>
              <Card.Body>
                <Card.Title>{game.name}</Card.Title>
                <Card.Text>
                  {game.description}
                </Card.Text>
                <LikeButton game={game}/>
                <Link to={`/games/${game._id}`}>
                  <Button variant="primary">More</Button>
                </Link>
                <Link to={`/games/add`}>
                  <Button variant="primary">Add to training</Button>
                </Link>
              </Card.Body>
            </Card>
            )
          })
        }
        <Link to={`/games/create`}>
          <Button variant="primary">Create your own game</Button>
        </Link>
      </div>
      }
    </div>
    )
  }
}


// return !this.state.selectedOption.includes(game.category) ? null :
