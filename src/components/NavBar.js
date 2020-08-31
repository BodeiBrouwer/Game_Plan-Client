import React from 'react'
import {Link} from 'react-router-dom'

export default function NavBar(props) {
    return (
      <ul id='navigation-bar'>
          <li>
            <Link to="/games">Games</Link>
          </li>
          <li>
            <Link to="/games/create">Create game</Link>  
          </li>
          <li>
            <Link to="/trainings">My trainings </Link>
          </li>
          <li className="mr-auto">
            <button onClick={props.onLogout}>Logout</button>
          </li>
        </ul>
    )
}
