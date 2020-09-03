import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'

export default function NotFound() {
  return (
    <div className='center-piece'>
      <h1>You've been tagged out of our site</h1>
      <h3>Route does not exist</h3>
      <iframe title='pineapple-gif' src="https://giphy.com/embed/VLuEi3ijz0wrC" height="200" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>


      <Link to={`/games`}>
        <Button variant="btn btn-success btn-404">Go home</Button>
      </Link>
    </div>
  )
}
