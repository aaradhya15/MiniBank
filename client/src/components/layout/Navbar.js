import React, {useContext} from "react";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";


import {AuthContext} from "../../context/authContext"



const NavBar = props => {

  
  const auth = useContext(AuthContext);
  const handleSubmit = e =>{
    e.preventDefault();
    console.log("logging out");
    auth.logout();
  }
  return(
    <header>
      <div>
        <ul style={{ listStyleType: "none" }}>
          {!auth.isAdmin&&
          <li>
          <NavLink to="/">
              Home
          </NavLink>
          </li>}
          {!auth.isAdmin&&
          <li>
          <NavLink to="/transactions/:props.id">
              MyTransactions
          </NavLink>
          </li>}
          {!auth.isAdmin&&
          <li>
          <NavLink to="/transfer">
              Transfer
          </NavLink>
          </li>}
          {auth.isAdmin&&
          <li>
          <NavLink to="/deposit">
              Deposit
          </NavLink>
          </li>
          }
          {auth.isAdmin&&
          <li>
          <NavLink to="/withdraw">
              Withdraw
          </NavLink>
          </li>}
          
          {auth.isAdmin&&
          <li>
          <NavLink to="/users">
              Users
          </NavLink>
          </li>}
          {auth.isAdmin&&
          <li>
          <NavLink to="/transactions">
              Transactions 
          </NavLink>
          </li>}
          <li>
          <Button type="submit" onClick = {handleSubmit} >
              logout 
          </Button>
          </li>
        
        </ul>
      </div>
    </header>
  )
}
export default NavBar;