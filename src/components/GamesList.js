import React from 'react'
import {Link} from 'react-router-dom'
import {Card, Button} from 'react-bootstrap'
import SearchGames from './SearchGames'
import {API_URL} from '../config'
import axios from 'axios'

export default class GamesList extends React.Component {

  state = {
    games: [],
  }
    
   componentDidMount() {
        axios.get(`${API_URL}/games`, {withCredentials: true})
          .then((games) => {
              this.setState({
                games: games.data,
              })
          })
  }


  render() {
    return (
      <div>
      {
        !this.props.loggedInUser ? <p>Sign in <Link to="/login">here</Link></p> : 
        <div>
        <SearchGames/>
        {
          this.state.games.map((game, i) => {
            return(
            <Card key={"game"+i}>
              <Card.Header as="h5">{game.category}</Card.Header>
              <Card.Body>
                <Card.Title>{game.name}</Card.Title>
                <Card.Text>
                  {game.description}
                </Card.Text>
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
