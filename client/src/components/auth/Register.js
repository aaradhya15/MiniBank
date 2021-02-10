import React, { Component } from "react";
import { Link } from "react-router-dom";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
    };
  
  onSubmit = e => {
    e.preventDefault();
   
    const newUser = {
    userName: this.state.userName,
    email: this.state.email,
    password: this.state.password,
    password2: this.state.password2
  };
  fetch('/api/users/register', {
    method: 'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify(newUser),
  }).then(res => {
    if(res.ok)
    console.log(res);
    else
    throw new Error(res.message);
  })
  .catch(err => console.log(err));
  console.log(newUser);
};

render() {
    const { errors } = this.state;

    return (
        <div className="container">
          <div className="row">
            <div className="col s8 offset-s2">
              <Link to="/" className="btn-flat waves-effect">
                <i className="material-icons left">keyboard_backspace</i> Back to
                home
              </Link>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <h4>
                  <b>Register</b> below
                </h4>
                <p className="grey-text text-darken-1">
                  Already have an account? <Link to="/login">Log in</Link>
                </p>
              </div>
              <form noValidate onSubmit={this.onSubmit}>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.userName}
                    error={errors.userName}
                    id="userName"
                    type="text"
                  />
                  <label htmlFor="name">Name</label>
                </div>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.email}
                    error={errors.email}
                    id="email"
                    type="email"
                  />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.password}
                    error={errors.password}
                    id="password"
                    type="password"
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <div className="input-field col s12">
                  <input
                    onChange={this.onChange}
                    value={this.state.password2}
                    error={errors.password2}
                    id="password2"
                    type="password"
                  />
                  <label htmlFor="password2">Confirm Password</label>
                </div>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                  <button
                    style={{
                      width: "150px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem"
                    }}
                    type="submit"
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  >
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
}

 
}
export default Register;