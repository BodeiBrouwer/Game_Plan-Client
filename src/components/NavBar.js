import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'

const NavBar = (props) => {
  return (
    <Navbar expand="lg">
    <Navbar.Brand href="/games">
      <img
        src={require("../images/Game-Plan-logo.png")}
        width="150"
        height="30"
        className="d-inline-block align-top"
        alt="Game Plan logo"
      />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="navbar--link" className="mr-auto">
        <Nav.Link className="navbar--link-item" href="/games">Games</Nav.Link>
        <Nav.Link className="navbar--link-item" href="/games/create">Create Game</Nav.Link>
        <Nav.Link className="navbar--link-item" href="/trainings">My Trainings</Nav.Link>
        <Nav.Link className="navbar--link-item" onClick={props.onLogout} >Log out</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  )};
  export default NavBar;

