import React from 'react'
import {Link} from 'react-router-dom'
import {Card, Button} from 'react-bootstrap'
import SearchGames from './SearchGames'

export default class GamesList extends React.Component {

  state = {
    games: [
      {
      category: 'Scenes',
      creator: 'Bodei',
      name: 'Morning gibberish',
      description: 'Practice gibberish by explaining your morning routine in gibberish...',
      purpose: 'Better physicality and gibberish',
      tags: ['Gibberish', 'Solo', 'Monologue']
      },
      {
      category: 'Exercises',
      creator: 'Jelle',
      name: 'Diamond dance',
      description: 'Follow the leader and dance in sync',
      purpose: 'Bluff',
      tags: ['Bluff', 'Teamwork', 'Physicality']
      }
    ]
    }
  


  render() {
    return (
      <div>
        <SearchGames/>
        {
          this.state.games.map((game, i) => {
            return(
            <Card>
              <Card.Header as="h5">{game.category}</Card.Header>
              <Card.Body>
                <Card.Title>{game.name}</Card.Title>
                <Card.Text>
                  {game.description}
                </Card.Text>
                <Link key={i} to={`/games/${game._id}`}>
                  <Button variant="primary">More</Button>
                </Link>
                <Link key={i} to={`/games/${game._id}/add`}>
                  <Button variant="primary">Add to training</Button>
                </Link>
              </Card.Body>
            </Card>
            )
          })
        }
      </div>
    )
  }
}
