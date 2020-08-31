import React from 'react'
import {Link} from 'react-router-dom'

export default function NavBar(props) {
    return (
        <nav className="slidemenu">

          <input type="radio" name="slideItem" id="slide-item-1" className="slide-toggle" defaultChecked/>
          <label htmlFor="slide-item-1"><p className="icon">♬</p><Link to="/games">Games</Link></label>
          
          <input type="radio" name="slideItem" id="slide-item-2" className="slide-toggle" defaultChecked/>
          <label htmlFor="slide-item-2"><p className="icon">★</p><Link to="/games/create">Create Game</Link></label>
          
          <input type="radio" name="slideItem" id="slide-item-3" className="slide-toggle" defaultChecked/>
          <label htmlFor="slide-item-3"><p className="icon">✈</p><Link to="/trainings">My Trainings</Link></label>
          
          <input type="radio" name="slideItem" id="slide-item-4" className="slide-toggle" defaultChecked/>
          <label htmlFor="slide-item-4"><p className="icon">✎</p><button className='logout-btn' onClick={props.onLogout}>Log Out</button></label>
          
          <div className="clear"></div>

          <div className="slider">
            <div className="bar"></div>
          </div>
          
        </nav>
    )
}
