import React from 'react'
import {Link} from 'react-router-dom'
import {Button, Card} from 'react-bootstrap'
import axios from 'axios'
import {API_URL} from '../config'

export default class UserDetails extends React.Component {

  state = {
    games: [],
    }

  componentDidMount() {
    let id = this.props.match.params.id
      axios.get(`${API_URL}/user/${id}`, {withCredentials: true})
      .then((games) => {
        this.setState({
        games: games.data,
        })
      })
    }

  render() {
    if (!this.state.games) {
      return <p>Loading .. </p>
    }

    const {name, category, description, _id, creator} = this.state.games

    return (
      <div className='form-page' >
      {
        !this.props.loggedInUser ? <p>Sign in <Link to="/login">here</Link></p> : 
        <div className='form-field'>
        <h1>{name}</h1>
        {
          !this.state.games ? (<p>Loading ... </p>) : 
          this.state.games.length === 0 ? null :
          <>
            <hr/>
            <h4>{creator._id}</h4>
          {
            this.state.games.map((game, i) => {
            return (
            <>
            <Card key={"mygame"+i}>
              <Card.Header className='card-header'><span className='card-title'><h5>{name}</h5> <h5>{category.charAt(0).toUpperCase() + category.slice(1)}</h5></span></Card.Header>
              <Card.Body>
                <Card.Text className='card-game-descr overflow'>
                  {description}
                </Card.Text>
                <Link to={`/games/${_id}`}>
                  <Button variant="btn btn-success">More</Button>
                </Link>
            </Card.Body>
            </Card>
            </>
            )
          })
          }
          </>
        }
      </div>
    }
      <div className='form-image'>
        <img  src={require("../images/pineapple-pink-glasses.png")} alt='festive pineapple'/>
      </div>
    </div>
    )
  }
}