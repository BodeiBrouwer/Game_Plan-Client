import React from 'react'

export default function LoginPage(props) {
    return (
      <div className="login-page">
      <section className="welcome-text">
        <img src={require("../images/Game-Plan-logo.png")}  alt='logo Game Plan'/>
        <p> Plan the perfect improv training <br></br> with the help of our game database </p>
      </section>
        <form className="form login-form" onSubmit={props.onSignIn}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input name="password" type="password" className="form-control" id="exampleInputPassword1" />
          </div>
          <button type="submit" className="btn btn-success">Submit</button>
        </form>
      </div>
    )
}
