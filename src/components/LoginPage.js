import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'

export default class LoginPage  extends React.Component {

  componentDidMount () {
    const currentRoute = this.props.location;
    if (currentRoute === 'LoginPage') {
    this.props.setState({ isNavbarHidden: true });
    }
  }

  render () {
    return (
      <div className="login-page">
      <section className="welcome-text">
        <img src={require("../images/Game-Plan-logo.png")}  alt='logo Game Plan'/>
        <p> Plan the perfect improv training <br></br> with the help of our game database </p>
      </section>
        <form className="form login-form" onSubmit={this.props.onSignIn}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input name="password" type="password" className="form-control" id="exampleInputPassword1" />
          </div>

          <div className='login-btns'>
            <button type="submit" className="btn btn-success">Submit</button>
            <Link to={`signup`}>
            <Button variant="btn btn-success">Sign up instead</Button>
            </Link>
          </div>
        </form>
      </div>
    )
  }
}
