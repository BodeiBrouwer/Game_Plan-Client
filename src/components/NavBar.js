import React from 'react'
import {Nav, Navbar} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default function NavBar(props) {
    return (
      <Navbar bg="light" expand="lg">
        <Nav className="row justify-content-around" activeKey="/home">
          <Nav.Item>
            <Link to="/games">Games</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/games/create">Create game</Link>  
          </Nav.Item>
          <Nav.Item>
            <Link to="/trainings">My trainings </Link>
          </Nav.Item>
          <Nav.Item className="mr-auto">
            <button onClick={props.onLogout}>Logout</button>
          </Nav.Item>
        </Nav>
      </Navbar>
    )
}
