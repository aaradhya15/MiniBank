import React, {  useContext, useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {AuthContext} from '../../context/authContext'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const auth = useContext(AuthContext);
  
  const handleSubmit = e => {
    e.preventDefault();
    
    const userData = {
      email: email,
      password: password
    };

    
    fetch('/api/users/login', {
    method: 'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify(userData),
  })
  .then(res => { 
    if(res.ok)
    return res.json()
  
    else
    throw new Error(res.message)})
    .then(res => { 
      const isAdmin = res.payload.isAdmin;
      console.log(res)
      auth.login(res.payload.accountNo,res.token.split(' ')[1],isAdmin);
      
      
      // const token = res.token.split(' ')[1];
      // this.props.setToken(token);
      
  })
  .catch(err => console.log(err));;
  console.log(userData);
  };

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }
  
 
    return (
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <Link to="/" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Login</b> below
              </h4>
              <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
            <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
          </div>
        </div>
      </div>
    );
  }
