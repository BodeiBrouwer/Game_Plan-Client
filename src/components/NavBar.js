import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = (props) => {
  return (
    <nav className="navbar">
      <div className="navbar--logo-holder">
        <Link to="/games"><img src={require("../images/Game-Plan-logo.png")} alt="logo" className="navbar--logo" /></Link>
      </div>
      <ul className="navbar--link">
        <li className="navbar--link-item"><Link className="navbar--link-item" to="/games">Games</Link></li>
        <li className="navbar--link-item"><Link className="navbar--link-item" to="/games/create">Create Game</Link></li>
        <li className="navbar--link-item"><Link className="navbar--link-item" to="/trainings">My Trainings</Link></li>
        <li className="navbar--link-item"><button className='logout-btn' onClick={props.onLogout}>Log Out</button></li>
      </ul>
    </nav>
  )};
  export default Navbar;